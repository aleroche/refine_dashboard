import CustomAvatar from '@/components/custom-avatar'
import { Text } from '@/components/text'
import { COMPANIES_LIST_QUERY, COMPANY_CONTACTS_TABLE_QUERY } from '@/graphql/queries'
import { Company } from '@/graphql/schema.types'
import { CompaniesListQuery } from '@/graphql/types'
import { currencyNumber } from '@/utilities'
import { SearchOutlined } from '@ant-design/icons'
import { CreateButton, DeleteButton, EditButton, FilterDropdown, List, useTable } from '@refinedev/antd'
import { HttpError, getDefaultFilter, useGo } from '@refinedev/core'
import { GetFieldsFromList } from '@refinedev/nestjs-query'
import { Input, Space, Table } from 'antd'
import React from 'react'


export const CompanyList = ({ children }: React.PropsWithChildren) => {
  const go = useGo()
  const { tableProps, filters } = useTable<GetFieldsFromList<CompaniesListQuery>,
    HttpError,
    GetFieldsFromList<CompaniesListQuery>
  >
    ({
      resource: 'companies',
      onSearch: (values: any) => {

        return [{
          field: 'name',
          operator: 'contains',
          value: values.name
        }]
      },
      pagination: {
        pageSize: 12
      },
      sorters: {
        initial: [
          {
            field: 'createdAt',
            order: 'desc'
          }
        ],
      },

      filters: {
        initial: [{
          field: 'name',
          operator: 'contains',
          value: undefined

        }]
      },

      meta: {
        gqlQuery: COMPANIES_LIST_QUERY
      }
    })
  return (
    <div>
      <List
        breadcrumb={false}
        headerButtons={() => (
          <CreateButton onClick={() => {
            go({
              to: {
                resource: 'companies',
                action: 'create'
              },
              options: {
                keepQuery: true
              },
              type: 'replace'
            })
          }} />
        )}
      >
        <Table {...tableProps}
          pagination={{ ...tableProps.pagination }}
        >
          <Table.Column<Company>
            title="Company Title"
            defaultFilteredValue={getDefaultFilter('name', filters)}
            filterIcon={<SearchOutlined />}
            filterDropdown={(props) => (
              <FilterDropdown {...props}>
                <Input placeholder="Search Company" />
              </FilterDropdown>
            )}

            render={(data) => (
              // console.log("Data", data)
              <Space>
                <CustomAvatar shape='square'
                  name={data.name}
                  src={data.avatarUrl} />

                <Text style={{ whiteSpace: 'nowrap' }}>
                  {data.name}
                </Text>
              </Space>
            )}
          />

          <Table.Column<Company>

            title="Open deals amount"
            render={(data) => (
              <Text>
                {currencyNumber(data?.dealsAggregate?.[0].sum?.value || 0)}
              </Text>
            )}
          />

          <Table.Column<Company>
            dataIndex="id"
            title="Actions"
            fixed='right'
            render={(data) => (
              <Space>
                <EditButton hideText size='small' recordItemId={data} />
                <DeleteButton hideText size='small' recordItemId={data} />
              </Space>
            )}
          />
        </Table>
      </List>

      {children}
    </div>

  )
}

