import React from 'react'
import { useState, useEffect } from 'react';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { Button } from '@mui/material';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import TextField from '@mui/material/TextField';
import { FormGroup } from '@material-ui/core';
import { useHistory, useParams } from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast';

const Task = ['mcq', 'text', 'boolean']
const Status = ['pending', 'draft', 'published', 'deleted']

const Create_task = () => {
    const user = localStorage.getItem('username')
    const {id} = useParams()
    console.log(id)
    const [image, setImage] = useState(null)
    const [imagePreview, setImagePreview] = useState('');
    const [formdata, setFormData] = useState({
        task_statement: '',
        status: '',
        task_img: image,
        createdby: user,
        task_type: '',
        task_type_mcq_opt1: '',
        task_type_mcq_opt2: '',
        task_type_mcq_opt3: '',
        task_type_mcq_opt4: '',
        task_type_text: '',
        task_type_boolean: '',
        task_title: ''



    })
    const history = useHistory()
    const [open, setOpen] = useState(false);
    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
        history.go(0)
    };
    const handleChange = name => e => {
        setFormData({ ...formdata, [name]: e.target.value })

    }
    const setImageUpload = (e) => {
        const reader = new FileReader();
        reader.onloadend = () => {
            setImagePreview(reader.result);
        }
        reader.readAsDataURL(e.target.files[0]);
        console.log(e.target.files)
        // setImage(e.target.files[0])
        setImage(e.target.files)
    }
   
    const { task_statement, status, task_type, createdby, task_type_mcq_opt1, task_type_mcq_opt2, task_type_mcq_opt3,
        task_type_mcq_opt4, task_type_text, task_type_boolean, task_img, task_title } = formdata



    const handleSubmit = async (e) => {
        console.log("clickedddddddddddddd")
         
       const Form_id = localStorage.getItem("Form_id")
        console.log(formdata)
        if (task_statement && status && createdby) {
            const token = localStorage.getItem('jwt')

            // e.preventDefault();

            const formData = new FormData()

            formData.append('files', image[0])

            const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/upload`, {
                method: 'POST',
                headers: {
                    Authorization: `Bearer ${token}`

                },
                body: formData
            })

            const img_data = await response.json()
            const imageId = img_data[0].id

            const res = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/tasks`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`

                },

                body: JSON.stringify({

                    "data": {
                        "task_statement_text": task_statement,
                        "projects":[id],
                        "status": status,
                        "task_image": imageId,
                        "createdby": user,
                        "task_form":[Form_id]

                    }
                })



            })
            const { data } = await res.json()

            if (res.status == 200) {
                toast.success("Successfully Created Task")
            }
            // handle_task_submit()
            handleClose()

        }
    }


    const handle_task_submit = async (e) => {
        console.log("clicked handle_task_submit..")
        const token = localStorage.getItem('jwt')
        if(task_type){
        const res = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/task-forms`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`

            },

            body: JSON.stringify({

                "data": {
                    "task_type": task_type,
                    "option1": task_type_mcq_opt1,
                    "option2": task_type_mcq_opt2,
                    "option3": task_type_mcq_opt3,
                    "option4": task_type_mcq_opt4,
                    "form_title": task_title,
                    "form_text": task_type_text,
                    "form_bool": task_type_boolean


                }
            })
    


        })
    
        const { data } = await res.json()
        console.log({data}.data.id)
        localStorage.setItem("Form_id",{data}.data.id)

        if (res.status == 200) {
            toast.success("Successfully Created Task")
        }
    }

        // handleClose()
        handleSubmit()
      
    }


    useEffect(() => {

        handleClickOpen()

    }, [])
    return (
        <div>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Create Task</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        {/* To subscribe to this website, please enter your email address here. We
            will send updates occasionally. */}
                    </DialogContentText>
                    <FormGroup className="form" noValidate autoComplete="off">
                        <TextField
                            autoFocus
                            margin="dense"
                            name='task_statement'

                            label="Task_statement"
                            type="text"
                            onChange={handleChange('task_statement')}
                            fullWidth
                            variant="standard"
                        />


                        <InputLabel style={{ padding: '8px' }} id="demo-simple-select-standard-label">Status</InputLabel>
                        <Select
                            labelId="demo-multiple-name-label"
                            id="demo-multiple-name"
                            name="status"
                            onChange={handleChange('status')}
                            style={{ padding: '10px', width: '550px' }}
                        >
                            {Status.map((s) => (
                                <MenuItem
                                    key={s}
                                    value={s}

                                >
                                    {s}
                                </MenuItem>
                            ))}
                        </Select>



                        <div className="imagePreview">


                            {imagePreview ? <img src={imagePreview} /> : ''}
                        </div>
                        <input
                            type="file"
                            accept="image/*"
                            style={{ display: 'none' }}
                            onChange={setImageUpload}
                            id="contained-button-file"
                        />

                        <label htmlFor="contained-button-file">

                            <Button variant="contained" color="primary" component="span" style={{
                                marginLeft: '185px'
                            }}>
                                Upload task image
                            </Button>

                        </label>


                        <InputLabel style={{ padding: '8px' }} id="demo-simple-select-standard-label">Task-type</InputLabel>
                        <Select
                            labelId="demo-multiple-name-label"
                            id="demo-multiple-name"
                            name="task_type"
                            onChange={handleChange('task_type')}
                            style={{ padding: '10px', width: '550px' }}
                        >
                            {Task.map((t) => (
                                <MenuItem
                                    key={t}
                                    value={t}

                                >
                                    {t}
                                </MenuItem>
                            ))}
                        </Select>
                        {task_type === 'mcq' ?
                            <div>
                                <TextField
                                    autoFocus
                                    margin="dense"
                                    name="task_type_mcq_opt1"

                                    label="Option1"
                                    type="text"
                                    onChange={handleChange('task_type_mcq_opt1')}
                                    fullWidth
                                    variant="standard"
                                />
                                <TextField
                                    autoFocus
                                    margin="dense"
                                    name="task_type_mcq_opt2"

                                    label="Option2"
                                    type="text"
                                    onChange={handleChange('task_type_mcq_opt2')}
                                    fullWidth
                                    variant="standard"
                                />
                                <TextField
                                    autoFocus
                                    margin="dense"
                                    name='task_type_mcq_opt3'

                                    label="Option3"
                                    type="text"
                                    onChange={handleChange('task_type_mcq_opt3')}
                                    fullWidth
                                    variant="standard"
                                />
                                <TextField
                                    autoFocus
                                    margin="dense"
                                    name='task_type_mcq_opt4'

                                    label="Option4"
                                    type="text"
                                    onChange={handleChange('task_type_mcq_opt4')}
                                    fullWidth
                                    variant="standard"
                                />
                            </div>



                            : ''}
                        {task_type === 'text' ?
                            <div>
                                <TextField
                                    autoFocus
                                    margin="dense"
                                    name='task_type_text'

                                    label="Task_type_text"
                                    type="text"
                                    onChange={handleChange('task_type_text')}
                                    fullWidth
                                    variant="standard"
                                />
                            </div>



                            : ''}
                        {task_type === 'boolean' ?
                            <div>
                                <TextField
                                    autoFocus
                                    margin="dense"
                                    name='task_type_boolean'

                                    label="Task_statement"
                                    type="text"
                                    onChange={handleChange('task_type_boolean')}
                                    fullWidth
                                    variant="standard"
                                />
                            </div>



                            : ''}


                        <TextField
                            autoFocus
                            margin="dense"
                            name='task_title'

                            label="Title"
                            type="text"
                            onChange={handleChange('task_title')}
                            fullWidth
                            variant="standard"
                        />
                      

                    </FormGroup>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    {/* <Button onClick={handleSubmit}>Create</Button> */}
                    <Button onClick={handle_task_submit}>Create</Button>

                </DialogActions>
            </Dialog>

        </div>
    )
}

export default Create_task