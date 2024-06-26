import React from 'react'
import './style.scss';
// import Form from 'react-bootstrap/Form';
import Box from '@mui/material/Box';
// import FormControl from '@mui/material/FormControl';
// import InputLabel from '@mui/material/InputLabel';
import TextField from '@mui/material/TextField';
// import {useForm} from 'react-hook-form'
import Button from '@mui/material/Button';
import {Link} from 'react-router-dom';
import Avatar from '@mui/material/Avatar';
// import Grid from '@mui/material/Grid';

function Profile() {
  // const [firstname, setFirstName] = useState('');
  // const [lastname, setLastName] = useState('');
  // const [address, setAddress] = useState('');
  // const [email, setEmail] = useState('');
  // const [phone, setPhone] = useState('')
  // const [city, setCity] = useState('')
  // const [state, setState] = useState('')
  return (
    <div className='myprofile'>
    <h2 className="h2-profile">My profile</h2>
    <Box component="form" sx={{ display: 'grip', width: 'auto'}}>
      <div>
          <TextField 
          sx={{m: 3, ml:2}}
          label="First Name"
          id="first-name"
          placeholder="Enter your first name"
          // onChange={(e) => setFirstName(e.target.value)}
          defaultValue="A"
          disabled={true}
          />
          <TextField 
          sx={{m: 3, mr: 2}}
          label="Last Name"
          id="last-name"
          placeholder="Enter your last name"
          defaultValue="Nguyen Van"
          // onChange={(e) => setLastName(e.target.value)}
          disabled={true}
          />
          <Avatar sx={{display:'inline-flex', width: 100, height: 100, float: 'right'}}/> 
      </div>
      <div>
      <TextField 
          sx={{m: 3, ml:2, mr: 2}}
          label="Email"
          id="email"
          fullWidth
          placeholder="Enter your email"
          defaultValue="NguyenVanA@gmail.com"
          // onChange={(e) => setEmail(e.target.value)}
          disabled={true}
          />
      </div>
      <div>
      <TextField 
          sx={{m: 3, ml:2, mr: 2}}
          label="Address"
          id="address"
          fullWidth
          placeholder="Enter the address"
          defaultValue="Ho Chi Minh City"
          // onChange={(e) => setAddress(e.target.value)}
          disabled={true}
          />
      </div>
      <TextField 
          sx={{m: 3, ml:2, mr: 2}}
          label="Phone number"
          id="phone"
          fullWidth
          placeholder="Enter the phone number"
          defaultValue="0987654321"
          // onChange={(e) => setPhone(e.target.value)}
          disabled={true}
          />
      <div>
          <TextField 
          sx={{m: 3, ml:2}}
          label="City"
          id="city"
          placeholder="Enter the city"
          // onChange={(e) => setCity(e.target.value)}
          defaultValue="Ho Chi Minh City"
          disabled={true}
          />
          <TextField 
          sx={{m: 3, mr: 2}}
          label="State"
          id="state"
          placeholder="Thu Duc District"
          // onChange={(e) => setState(e.target.value)}
          disabled={true}
          />
      </div>
    </Box>
      <Link to="../edit"className='btn-edit'>
        <Button variant="contained" type='submit'>Edit</Button>  
      </Link>
    </div>
    
  )
}

export default Profile