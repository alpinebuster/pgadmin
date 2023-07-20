import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useEffect } from 'react';
import { makeStyles } from '@material-ui/core';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import AccountCircleRoundedIcon from '@material-ui/icons/AccountCircleRounded';
import IconButton from '@material-ui/core/IconButton';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import SearchIcon from '@material-ui/icons/Search';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';

import pgAdmin from 'sources/pgadmin';
import gettext from 'sources/gettext';
import {
  EV_RUNTIME_REFRESH_MENU_ITEM,
  EV_RUNTIME_TOGGLE_MENU_ITEM
} from 'sources/constants';

import { PrimaryButton } from './components/Buttons';
import {
  PgMenu, PgMenuDivider, PgMenuItem, PgSubMenu
} from './components/Menu';

const navbarHeight = '38px';  // NOTE: `navbar-height`
const useStyles = makeStyles((theme)=>({
  root: {
    height: navbarHeight,
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.primary.contrastText,
    flexGrow: 1,
  },
  appbar: {
    height: navbarHeight,
  },
  toolbar: {
    height: navbarHeight,
    minHeight: navbarHeight,
    // top, right, bottom, left
    padding: '0rem 0.25rem 0rem 0.5rem',
  },
  logo: {
    width: '96px',
    height: '100%',
    background: 'url(data:image/svg+xml;base64,PHN2ZyBpZD0iTGF5ZXJfMSIgZGF0YS1uYW1lPSJMYXllciAxIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyMDUgNTAiPjxkZWZzPjxzdHlsZT4uY2xzLTF7ZmlsbDojZmZmO30uY2xzLTJ7ZmlsbDojMzI2ODkzO308L3N0eWxlPjwvZGVmcz48dGl0bGU+cGdBZG1pbjwvdGl0bGU+PHBhdGggY2xhc3M9ImNscy0xIiBkPSJNNTguOTQsNDEuNGEyLjQ4LDIuNDgsMCwwLDEtMi4yNy0zLjQ5TDY0LDIxLjI5VjZhNiw2LDAsMCwwLTYtNkg2QTYsNiwwLDAsMCwwLDZWNDRhNiw2LDAsMCwwLDYsNkg1OGE2LDYsMCwwLDAsNi02VjQxLjRaIi8+PHBhdGggY2xhc3M9ImNscy0yIiBkPSJNMjkuMjUsMzAuMTdhMTMuMTMsMTMuMTMsMCwwLDEtMS44Mi02LjkzLDEzLDEzLDAsMCwxLDEuODItNi44OCwxMi41LDEyLjUsMCwwLDEsMS40OC0xLjk1LDEwLjQ0LDEwLjQ0LDAsMCwwLTMuMjUtMi44OSwxMS4xNiwxMS4xNiwwLDAsMC01LjY1LTEuNDVxLTQuNDgsMC02LjcyLDIuNjRWMTAuNDRINy41MVY0MC4zNmExLDEsMCwwLDAsMSwxaDZhMSwxLDAsMCwwLDEtMVYzMS4xOWE4LjQ3LDguNDcsMCwwLDAsNi4zNCwyLjQsMTEuMjYsMTEuMjYsMCwwLDAsNS42NS0xLjQ1LDEwLjUzLDEwLjUzLDAsMCwwLDIuMDYtMS41NkMyOS40NCwzMC40NCwyOS4zNCwzMC4zMSwyOS4yNSwzMC4xN1pNMjMuNiwyNS44YTQuNTIsNC41MiwwLDAsMS0zLjQ1LDEuNDQsNC40OCw0LjQ4LDAsMCwxLTMuNDQtMS40NCw1LjYsNS42LDAsMCwxLTEuMzUtNCw1LjU5LDUuNTksMCwwLDEsMS4zNS00LDQuNDYsNC40NiwwLDAsMSwzLjQ0LTEuNDUsNC40OSw0LjQ5LDAsMCwxLDMuNDUsMS40NSw1LjYzLDUuNjMsMCwwLDEsMS4zNCw0QTUuNjQsNS42NCwwLDAsMSwyMy42LDI1LjhaIi8+PHBhdGggY2xhc3M9ImNscy0yIiBkPSJNNTYuNDksMTIuNjNWMzEuMjRxMCw2LjM1LTMuNDQsOS41MXQtOS45MiwzLjE3YTI1LjQyLDI1LjQyLDAsMCwxLTYuMy0uNzUsMTUsMTUsMCwwLDEtNS0yLjIzbDIuODktNS41OWExMC4xNywxMC4xNywwLDAsMCwzLjUxLDEuNzksMTQuMzcsMTQuMzcsMCwwLDAsNC4xOC42NUE2LjUzLDYuNTMsMCwwLDAsNDcsMzYuNGE1LjM3LDUuMzcsMCwwLDAsMS40Ny00LjExdi0uNzZjLTEuNTQsMS44LTMuNzksMi42OS02Ljc2LDIuNjlhMTEuNywxMS43LDAsMCwxLTUuNTktMS4zNkExMC4zNywxMC4zNywwLDAsMSwzMi4wOSwyOWExMC44OSwxMC44OSwwLDAsMS0xLjUxLTUuNzcsMTAuODYsMTAuODYsMCwwLDEsMS41MS01Ljc0LDEwLjQyLDEwLjQyLDAsMCwxLDQuMDctMy44NiwxMS43MSwxMS43MSwwLDAsMSw1LjU5LTEuMzdjMy4yNSwwLDUuNjMsMS4wNiw3LjE0LDMuMTVWMTIuNjNabS05LjMsMTMuOTVhNC40LDQuNCwwLDAsMCwxLjQtMy4zNiw0LjM0LDQuMzQsMCwwLDAtMS4zOC0zLjM0LDUuNjUsNS42NSwwLDAsMC03LjE2LDAsNC4zLDQuMywwLDAsMC0xLjQxLDMuMzQsNC4zNSw0LjM1LDAsMCwwLDEuNDMsMy4zNiw1LjA4LDUuMDgsMCwwLDAsMy41NywxLjNBNSw1LDAsMCwwLDQ3LjE5LDI2LjU4WiIvPjxwYXRoIGNsYXNzPSJjbHMtMSIgZD0iTTgzLjQzLDMyLjg5SDcxbC0yLDUuMDlhMSwxLDAsMCwxLS45My42Mkg2MS43M2ExLDEsMCwwLDEtLjkxLTEuNEw3Mi45MSw5LjhhMSwxLDAsMCwxLC45Mi0uNmg2Ljg5YTEsMSwwLDAsMSwuOTEuNkw5My43NywzNy4yYTEsMSwwLDAsMS0uOTIsMS40SDg2LjQxYTEsMSwwLDAsMS0uOTMtLjYyWk04MSwyNi43NmwtMy43OC05LjQxLTMuNzgsOS40MVoiLz48cGF0aCBjbGFzcz0iY2xzLTEiIGQ9Ik0xMjAuNDQsOC40NFYzNy42YTEsMSwwLDAsMS0xLDFoLTUuNmExLDEsMCwwLDEtMS0xVjM2LjMzUTExMC42MiwzOSwxMDYuMTYsMzlhMTEuMjksMTEuMjksMCwwLDEtNS42Ny0xLjQ1LDEwLjU0LDEwLjU0LDAsMCwxLTQtNC4xNEExMi42MiwxMi42MiwwLDAsMSw5NSwyNy4xOCwxMi41MywxMi41MywwLDAsMSw5Ni40NCwyMWExMC4zNSwxMC4zNSwwLDAsMSw0LTQuMDksMTEuNDgsMTEuNDgsMCwwLDEsNS42Ny0xLjQzLDguMjQsOC4yNCwwLDAsMSw2LjMsMi4zNVY4LjQ0YTEsMSwwLDAsMSwxLTFoNkExLDEsMCwwLDEsMTIwLjQ0LDguNDRabS05LjE5LDIyLjc1YTUuNzEsNS43MSwwLDAsMCwxLjM0LTQsNS42LDUuNiwwLDAsMC0xLjMyLTMuOTUsNC40Nyw0LjQ3LDAsMCwwLTMuNDMtMS40Myw0LjUzLDQuNTMsMCwwLDAtMy40NCwxLjQzLDUuNTEsNS41MSwwLDAsMC0xLjM0LDMuOTUsNS42Nyw1LjY3LDAsMCwwLDEuMzQsNCw0Ljc3LDQuNzcsMCwwLDAsNi44NSwwWiIvPjxwYXRoIGNsYXNzPSJjbHMtMSIgZD0iTTE2MSwxOGMxLjY2LDEuNjgsMi41LDQuMjEsMi41LDcuNnYxMmExLDEsMCwwLDEtMSwxaC02YTEsMSwwLDAsMS0xLTFWMjYuODhhNS42Nyw1LjY3LDAsMCwwLS45LTMuNTMsMy4wOSwzLjA5LDAsMCwwLTIuNTUtMS4xMywzLjYyLDMuNjIsMCwwLDAtMi44OSwxLjI2LDUuNzEsNS43MSwwLDAsMC0xLjEsMy44MlYzNy42YTEsMSwwLDAsMS0xLDFoLTZhMSwxLDAsMCwxLTEtMVYyNi44OGMwLTMuMTEtMS4xNC00LjY2LTMuNDQtNC42NmEzLjcsMy43LDAsMCwwLTIuOTQsMS4yNiw1LjcxLDUuNzEsMCwwLDAtMS4wOSwzLjgyVjM3LjZhMSwxLDAsMCwxLTEsMWgtNmExLDEsMCwwLDEtMS0xVjE2Ljg0YTEsMSwwLDAsMSwxLTFoNS42YTEsMSwwLDAsMSwxLDF2MS4zOWE4LDgsMCwwLDEsMy0yLjA4LDEwLjIzLDEwLjIzLDAsMCwxLDMuOC0uNjksMTAsMTAsMCwwLDEsNC4yOS44OEE3LjI4LDcuMjgsMCwwLDEsMTQ2LjQyLDE5YTguODUsOC44NSwwLDAsMSwzLjQxLTIuNjUsMTAuOTMsMTAuOTMsMCwwLDEsNC40OS0uOTJBOSw5LDAsMCwxLDE2MSwxOFoiLz48cGF0aCBjbGFzcz0iY2xzLTEiIGQ9Ik0xNjguMTIsMTIuMWEzLjkxLDMuOTEsMCwwLDEtMS4zNC0yLjc5QTQuMTYsNC4xNiwwLDAsMSwxNjgsNi4xOWE1LDUsMCwwLDEsMy42Ny0xLjM2QTUuMjUsNS4yNSwwLDAsMSwxNzUuMTgsNmEzLjc1LDMuNzUsMCwwLDEsMS4zNCwzLDQuMSw0LjEsMCwwLDEtMS4zNCwzLjEzLDUuNjgsNS42OCwwLDAsMS03LjA2LDBabS41NCwzLjc0aDZhMSwxLDAsMCwxLDEsMVYzNy42YTEsMSwwLDAsMS0xLDFoLTZhMSwxLDAsMCwxLTEtMVYxNi44NEExLDEsMCwwLDEsMTY4LjY2LDE1Ljg0WiIvPjxwYXRoIGNsYXNzPSJjbHMtMSIgZD0iTTIwMS41NSwxOHEyLjU5LDIuNTIsMi41OSw3LjZ2MTJhMSwxLDAsMCwxLTEsMWgtNmExLDEsMCwwLDEtMS0xVjI2Ljg4cTAtNC42Ni0zLjc0LTQuNjZhNC4zLDQuMywwLDAsMC0zLjMsMS4zNCw1LjgzLDUuODMsMCwwLDAtMS4yNCw0djEwYTEsMSwwLDAsMS0xLDFoLTZhMSwxLDAsMCwxLTEtMVYxNi44NGExLDEsMCwwLDEsMS0xaDUuNjFhMSwxLDAsMCwxLDEsMXYxLjQ3YTkuMDUsOS4wNSwwLDAsMSwzLjE5LTIuMTIsMTAuNzgsMTAuNzgsMCwwLDEsNC0uNzNBOS4zNCw5LjM0LDAsMCwxLDIwMS41NSwxOFoiLz48L3N2Zz4=)  0 0 no-repeat',
    backgroundPositionY: 'center',
  },
  menus: {
    display: 'flex',
    alignItems: 'center',
    gap: '2px',
    marginLeft: '16px',

    '& .MuiButton-containedPrimary': {
      padding: '2px 8px',
    }
  },
  menuButton: {
    color: theme.palette.text.white,
    fontSize: '0.925rem',
  },
  userMenu: {
    marginLeft: 'auto',
    '& .MuiButton-containedPrimary': {
      fontSize: '0.825rem',
    }
  },
  gravatar: {
    marginRight: '4px',
  },
  paper: {
    padding: 0,
    display: 'flex',
    border: 0,
    alignItems: 'center',
  },
  typography: {
    padding: '2px 32px 2px 2px',
    margin: 0,
    flex: 1,
  },
  iconButton: {
    paddingLeft: theme.spacing(0.6),
    paddingRight: theme.spacing(0.6),
    paddingTop: '2px',
    paddingBottom: '2px',
    alignItems: 'center',
    boxShadow: 'none',
    textTransform: 'none',
    fontSize: 16,
    border: '0px solid',
    borderRadius: '4px',
    '&:hover': {
      border: '0px solid',
      boxShadow: 'none',
      color: theme.palette.primary.hoverContrastText,
      backgroundColor: theme.palette.background.default,
      borderColor: theme.palette.primary.hoverMain,
    },
    '&:active': {
      border: '0px solid',
      boxShadow: 'none',
      color: theme.palette.primary.hoverContrastText,
      backgroundColor: theme.palette.background.default,
      borderColor: theme.palette.primary.main,
    },
  },
}));

export default function AppMenuBar({onSearchClick}) {
  const classes = useStyles();
  const [,setRefresh] = useState(false);

  const reRenderMenus = () => setRefresh((prev) => !prev);

  useEffect(()=>{
    pgAdmin.Browser.Events.on(
      EV_RUNTIME_TOGGLE_MENU_ITEM,
      () => {reRenderMenus();}
    );
    pgAdmin.Browser.Events.on(
      EV_RUNTIME_REFRESH_MENU_ITEM,
      () => {reRenderMenus();}
    );
  }, []);

  const getPgMenuItem = (menuItem, i)=>{
    if(menuItem.type == 'separator') {
      return <PgMenuDivider key={i}/>;
    }
    const hasCheck = typeof menuItem.checked == 'boolean';

    return (
      <PgMenuItem
        key={i}
        disabled={menuItem.isDisabled}
        onClick={()=>{
          menuItem.callback();
          if(hasCheck) {
            reRenderMenus();
          }
        }}
        hasCheck={hasCheck}
        checked={menuItem.checked}
        closeOnCheck={true}
      >
        {menuItem.label}
      </PgMenuItem>
    );
  };

  const userMenuInfo = pgAdmin.Browser.utils.userMenuInfo;

  return(
    <div className={classes.root}>
      <AppBar position="static" className={classes.appbar}>
        <Toolbar className={classes.toolbar}>
          <div className={classes.logo} />
          <div className={classes.menus}>
            {pgAdmin.Browser.MainMenus?.map((menu, i)=>{
              return (
                <PgMenu
                  menuButton={
                    <PrimaryButton
                      key={i} className={classes.menuButton}
                      data-label={menu.label}
                    >
                      {menu.label}
                      <KeyboardArrowDownIcon fontSize="small" />
                    </PrimaryButton>
                  }
                  label={menu.label}
                  key={menu.name}
                >
                  {menu.getMenuItems().map((menuItem, i)=>{
                    const submenus = menuItem.getMenuItems();
                    if(submenus) {
                      return (
                        <PgSubMenu key={i} label={menuItem.label}>
                          {submenus.map((submenuItem, si)=>{
                            return getPgMenuItem(submenuItem, si);
                          })}
                        </PgSubMenu>
                      );
                    }
                    return getPgMenuItem(menuItem, i);
                  })}
                </PgMenu>
              );
            })}
          </div>

          <Paper
            className={classes.paper}
            variant='outlined'
          >
            <IconButton
              disableRipple variant="outlined"
              onClick={onSearchClick}
              className={classes.iconButton} aria-label='search'
            >
              <SearchIcon />
              <Typography
                className={classes.typography}
                variant="button"
              >
                {gettext('Search')}
              </Typography>
            </IconButton>
          </Paper>

          {userMenuInfo &&
            <div className={classes.userMenu}>
              <PgMenu
                menuButton={
                  <PrimaryButton
                    className={classes.menuButton}
                    data-test="loggedin-username"
                  >
                    <div className={classes.gravatar}>
                      {userMenuInfo.gravatar &&
                        <img
                          src={userMenuInfo.gravatar}
                          width="18" height="18"
                          alt="Gravatar image for {{ userMenuInfo.username }}"
                        />
                      }
                      {!userMenuInfo.gravatar && <AccountCircleRoundedIcon />}
                    </div>
                    { userMenuInfo.username } ({userMenuInfo.auth_source})
                    <KeyboardArrowDownIcon fontSize="small" />
                  </PrimaryButton>
                }
                label={userMenuInfo.username}
                align="end"
              >
                {userMenuInfo.menus.map((menuItem, i)=>{
                  return getPgMenuItem(menuItem, i);
                })}
              </PgMenu>
            </div>
          }
        </Toolbar>
      </AppBar>
    </div>
  );
}

AppMenuBar.propTypes = {
  onSearchClick: PropTypes.func,
};
