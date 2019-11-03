import React, { useEffect, useState } from 'react'
import BaseTable from './BaseTable'
import actions from 'actions/user'
import { Button } from 'semantic-ui-react'
import { useDispatch, useSelector } from 'react-redux';
import UserModal from './UserModal'


function UserTable() {
    let users = useSelector((state) => state.user.users);
    const dispatch = useDispatch();
    const getUsers = () => dispatch(actions.getUsersAction());
    useEffect(() => {
        async function fetchUsers() {
            await getUsers();
        }
        if (!users.length) {
            fetchUsers();
        }
    })
    users = users.map(user => {
        const isDesigner = user.roles.filter(el => el.name === 'Designer')[0] != undefined
        const isAnnotator = user.roles.filter(el => el.name === 'Annotator')[0] != undefined
        return (
            {
                key: user.user_name,
                ...user,
                isDesigner,
                isAnnotator,
                deletable: true,
                changeable: true
            }
        )
    })

    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [editUserdata, setEditUserdata] = useState({isDesigner: false});


    const tableData = {
        header: [
            {
                title: 'Username',
                key: 'user_name'
            },
            {
                title: 'Email',
                key: 'email'
            },
            {
                title: 'Designer',
                key: 'isDesigner'
            },
            // {
            //     title: 'Annotator',
            //     key: 'isAnnotator'
            // },
            {
                title: '',
                key: 'edit'
            },
            {
                title: '',
                key: 'deleteUser'
            },
        ],
        data: users
    }

    const dataTableCallback = (editUserData) => {
        console.log(users.filter(user => user.user_name === editUserData.user_name)[0])
        setModalIsOpen(true);
        setEditUserdata(users.filter(user => user.user_name === editUserData.user_name)[0])
    }
    return (
        <div>

            <UserModal  modalIsOpen={modalIsOpen}
                toggle={() => {
                    if (modalIsOpen) {
                        setEditUserdata({isDesigner: false})
                    }
                    setModalIsOpen(!modalIsOpen)
                }
                } />
            <Button basic color='blue'
                onClick={() => {
                    setModalIsOpen(true)
                }}>
                Add User
    </Button>
            <BaseTable tableData={tableData} callback={dataTableCallback} />

        </div>
    )
}

export default UserTable
