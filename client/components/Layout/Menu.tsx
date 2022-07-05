import * as React from 'react';
import _ from 'lodash';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import {
  Collapse,
  Grid,
  Icon,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  ListSubheader,
  SvgIcon,
} from '@mui/material';
import { ExpandLess, ExpandMore } from '@mui/icons-material';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import StarBorder from '@mui/icons-material/StarBorder';
import { routes } from '../../routes';
import * as m_icon from '@mui/icons-material';

export default function DashboardMenu() {
  const [open, setOpen] = React.useState(true);

  const handleClick = () => {
    setOpen(!open);
  };
  return (
    <Box
      sx={{
        height: '100vh',
        boxShadow: '3px 3px 6px 0px #eee',
      }}
    >
      <Typography
        variant='h6'
        noWrap
        component='div'
        sx={{
          display: { xs: 'none', sm: 'block' },
          textAlign: 'center',
          padding: '20px 0',
        }}
      >
        RobotManager
      </Typography>

      {routes.map((route) => {
        return (
          <List
            sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}
            component='nav'
            aria-labelledby='nested-list-subheader'
            subheader={
              <ListSubheader component='div' id='nested-list-subheader'>
                {route.name}
              </ListSubheader>
            }
          >
            {route.list.map(({ name, icon }) => {
              const Icon = _.get(m_icon, icon, null);
              return (
                <ListItemButton key={name}>
                  <ListItemIcon>{Icon && <Icon />}</ListItemIcon>
                  <ListItemText primary={name} />
                </ListItemButton>
              );
            })}

            <ListItemButton onClick={handleClick}>
              <ListItemIcon>
                <InboxIcon />
              </ListItemIcon>
              <ListItemText primary='Inbox' />
              {open ? <ExpandLess /> : <ExpandMore />}
            </ListItemButton>
            <Collapse in={open} timeout='auto' unmountOnExit>
              <List component='div' disablePadding>
                <ListItemButton sx={{ pl: 4 }}>
                  <ListItemIcon>
                    <StarBorder />
                  </ListItemIcon>
                  <ListItemText primary='Starred' />
                </ListItemButton>
              </List>
            </Collapse>
          </List>
        );
      })}
    </Box>
  );
}
