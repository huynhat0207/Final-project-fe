import React from 'react'
import './style.scss';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import List from '@mui/material/List';
// import OutlinedInput from '@mui/material/OutlinedInput';
// import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

function Language() {
  // const languages = [
  //   'English',
  //   'Vietnamese'
  // ];
  const [age, setAge] = React.useState('');
  const handleChange = (event) => {
    setAge(event.target.value);
  };
  return (
    <div className='mylanguage'>
      <h2 className="h2-language">Language</h2>
      <List>
      <ListItem sx={{fontWeight: 'bold'}}>
        <ListItemText sx={{color:'#0048FF'}}
          primary="Which languages do you want to use ? "
        />
        <FormControl sx={{ m: 1, minWidth: 120 }}>
        <Select
          value={age}
          onChange={handleChange}
          displayEmpty
          inputProps={{ 'aria-label': 'Without label' }}
        >
          <MenuItem value=''>English</MenuItem>
          <MenuItem value={'vi'}>Vietnamese</MenuItem>
        </Select>
      </FormControl>

      </ListItem>
      </List>
    </div>
  )
}

export default Language