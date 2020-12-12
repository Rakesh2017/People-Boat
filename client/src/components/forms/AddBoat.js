import React, { useEffect, useState } from 'react'
import { useMutation } from '@apollo/client'

import { Form, Input, Button } from 'antd'

import { v4 as uuidv4 } from 'uuid'

import { ADD_PERSON, GET_PEOPLE, ADD_BOAT } from '../../queries'

const AddBoat = () => {
    const [id] = useState(uuidv4())
    const [addPerson] = useMutation(ADD_PERSON)

    const [form] = Form.useForm()
    const [, forceUpdate] = useState()

    // To disable submit button at the beginning.
    useEffect(() => {
        forceUpdate({})
    }, [])

    const onFinish = values => {
        const personId = 1
        const { model, year, price, make, id } = values

        ADD_BOAT({
            variables: {
                id,
                model,
                year,
                price,
                make,
                personId
            },
            optimisticResponse: {
                __typename: 'Mutation',
                addPerson: {
                    __typename: 'Boat',
                    id,
                    firstName,
                    lastName
                }
            },
            update: (proxy, { data: { addPerson } }) => {
                const data = proxy.readQuery({ query: GET_PEOPLE })
                proxy.writeQuery({
                    query: GET_PEOPLE,
                    data: {
                        ...data,
                        people: [...data.people, addPerson]
                    }
                })
            }
        })
    }

    return (
        <Form
            form={form}
            name='add-person-form'
            layout='inline'
            onFinish={onFinish}
            size='large'
            style={{ marginBottom: '40px' }}
        >
            <Form.Item
                name='model'
                rules={[{ required: true, message: 'Please input boat model' }]}
            >
                <Input placeholder='i.e. Mazda 3' />
            </Form.Item>
            <Form.Item
                name='year'
                rules={[{ required: true, message: 'Please input build year' }]}
            >
                <Input placeholder='i.e. 1996' />
            </Form.Item>
            <Form.Item
                name='price'
                rules={[{ required: true, message: 'Please input price' }]}
            >
                <Input placeholder='i.e. 307550' />
            </Form.Item>
            <Form.Item
                name='make'
                rules={[{ required: true, message: 'Please input boat make' }]}
            >
                <Input placeholder='i.e. hydra sport' />
            </Form.Item>
            <Form.Item shouldUpdate={true}>
                {() => (
                    <Button
                        type='primary'
                        htmlType='submit'
                        disabled={
                            !form.isFieldsTouched(true) ||
                            form.getFieldsError().filter(({ errors }) => errors.length).length
                        }
                    >
                        Add Boat
                    </Button>
                )}
            </Form.Item>
        </Form>
    )
}

export default AddBoat
