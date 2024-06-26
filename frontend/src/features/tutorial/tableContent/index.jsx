import React from "react";
import './styles.scss'
import Box from '@mui/material/Box';
// import ListSubheader from '@mui/material/ListSubheader';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Collapse from '@mui/material/Collapse';
import ArticleIcon from '@mui/icons-material/Article';
import AnalyticsIcon from '@mui/icons-material/Analytics';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import QueryStatsIcon from '@mui/icons-material/QueryStats';

function TableContent() {
  const [openGetStarted, setOpenGetStarted] = React.useState(true);
  const [openStatistic, setOpenStatistic] = React.useState(true);
  const [openForecasting, setOpenForecasting] = React.useState(true);
  const handleClickGetStarted = () => {
    setOpenGetStarted(!openGetStarted);
  };
  const handleClickStatistic = () => {
    setOpenStatistic(!openStatistic);
  };
  const handleClickForecasting = () => {
    setOpenForecasting(!openForecasting);
  };

  const changeContent = (to) => {
    window.location.href = to;
  }
  const content = {
    getstart: [
      {name: 'First Step with Data&Retailer', to:'./get-started'}
    ],
    statistics: [{name: 'Descriptive Statistic', to:'./descriptive'}],
    forecasting: []
  }
  return (
    <Box sx={{ width: '25%', borderRight:'1px solid', height: '100vh'}}>
      <List>
      <ListItemButton onClick={handleClickGetStarted} sx={{color: '#002B9A'}} >
        <ListItemIcon>
          <ArticleIcon sx={{color: '#002B9A'}}/>
        </ListItemIcon>
        <ListItemText primary="Get Started" />
        {openGetStarted ? <ExpandLess /> : <ExpandMore />}
      </ListItemButton>
      <Collapse in={openGetStarted} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          {content.getstart.map(item => { return (
            <ListItemButton sx={{ pl: 9}} onClick={() => changeContent(item.to)}>
            <ListItemText primary={item.name} />
            </ListItemButton>)
          })}
        </List>
      </Collapse>
      <ListItemButton onClick={handleClickStatistic} sx={{color: '#002B9A'}} >
        <ListItemIcon>
          <AnalyticsIcon sx={{color: '#002B9A'}} />
        </ListItemIcon>
        <ListItemText primary="Statistics" />
        {openStatistic ? <ExpandLess /> : <ExpandMore />}
      </ListItemButton>
      <Collapse in={openStatistic} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
        {content.statistics.map(item => { return (
            <ListItemButton sx={{ pl: 9}} onClick={() => changeContent(item.to)}>
            <ListItemText primary={item.name} />
            </ListItemButton>)
          })}
        </List>
      </Collapse>
      <ListItemButton onClick={handleClickForecasting} sx={{color: '#002B9A'}} >
        <ListItemIcon>
          <QueryStatsIcon sx={{color: '#002B9A'}} />
        </ListItemIcon>
        <ListItemText primary="Forecasting" />
        {openForecasting ? <ExpandLess /> : <ExpandMore />}
      </ListItemButton>
      <Collapse in={openForecasting} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
        {content.forecasting.map(item => { return (
            <ListItemButton sx={{ pl: 9}} onClick={() => changeContent(item.to)}>
            <ListItemText primary={item.name} />
            </ListItemButton>)
          })}
        </List>
      </Collapse>
      </List>
    </Box>
  );
}

export default TableContent;
