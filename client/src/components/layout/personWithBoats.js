import React from 'react'
import { GET_MY_BOATS } from '../../queries'
import { useQuery } from '@apollo/client'

const PersonWithBoats = ({ display, id }) => {

    const styles = ({
        container: {
            display: display,
            position: 'relative',
            top: '20px',
        },
        list: {
            listStyleType: 'none',
            display: 'grid',
            gridGap: '10px',
            padding: '10px',
            border: 'solid 1px',
            borderRadius: '3px',
        },
        child: {
            border: 'solid 1px grey',
            borderRadius: '3px',
            padding:'10px',
            background: 'grey'
        },
        grey: {
            color: 'whiteSmoke'
        },
        bold: {
            fontWeight: 'bold',
            color: 'orange'
        }
    })

    const { loading, error, data } = useQuery(GET_MY_BOATS, { variables: { personId: id } })
    if (loading) return '..'
    if (error) return `Errror! ${error.message}`
    return (
        <div style={styles.container}>
            <h3>My Boats</h3>
            <ul style={styles.list}>
                {
                    data.personWithboats.map(item => {
                        return <li style={styles.child}> <span style={styles.grey}>Model:</span> <span style={styles.bold}>{item.model},</span> <span style={styles.grey}>Year:</span> <span style={styles.bold}>{item.year},</span> <span style={styles.grey}>Price:</span> <span style={styles.bold}>${item.price},</span> <span style={styles.grey}>Make:</span> <span style={styles.bold}>{item.make}</span></li>
                    })
                }
            </ul>
        </div>
    )
}

export default PersonWithBoats;
