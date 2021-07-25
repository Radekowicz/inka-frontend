import React from 'react';
import Drawer from '@material-ui/core/Drawer';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import TodayIcon from '@material-ui/icons/Today';
import GroupIcon from '@material-ui/icons/Group';
import SettingsIcon from '@material-ui/icons/Settings';
import { Link, useLocation } from 'react-router-dom';
import useStyles from './Sidebar.styles';

const sidebarItems = [
  {
    title: 'Wizyty',
    url: '/appointments',
    icon: <TodayIcon />,
  },
  {
    title: 'Pacjenci',
    url: '/patients',
    icon: <GroupIcon />,
  },
  {
    title: 'Ustawienia',
    url: '/settings',
    icon: <SettingsIcon />,
  },
];

export default function Appbar() {
  const classes = useStyles();
  const location = useLocation();

  return (
    <div>
      <Drawer
        className={classes.drawer}
        variant="permanent"
        classes={{
          paper: classes.drawerPaper,
        }}
      >
        <Toolbar />
        <div className={classes.drawerContainer}>
          <List>
            {sidebarItems.map((item) => (
              <ListItem
                button
                key={item.title}
                to={item.url}
                component={Link}
                selected={item.url === `/${location.pathname.split('/')[1]}`}
              >
                <ListItemIcon>{item.icon}</ListItemIcon>
                <ListItemText primary={item.title} />
              </ListItem>
            ))}
          </List>
        </div>
      </Drawer>
    </div>
  );
}
