import React from "react";
import routes from "../routes";
import { NavLink } from "react-router-dom";
import Button from "@material-ui/core/Button";
import M from "@material-ui/core/Menu";
import MItem from "@material-ui/core/MenuItem";
import { withStyles } from "@material-ui/core/styles";
import ProfileBox from "../components/ProfileBox";
import profilePic from "../assets/images/profileSample.png";

const styles = theme => ({});

const Menu = () => {
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = event => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <ProfileBox pic={profilePic} id="dummy" name="dummy" rank="dummy" />
      <div>
        <Button
          aria-controls="simple-menu"
          aria-haspopup="true"
          onClick={handleClick}
        >
          MENU-1
        </Button>
        <M
          id="simple-menu"
          anchorEl={anchorEl}
          keepMounted
          open={Boolean(anchorEl)}
          onClose={handleClose}
        >
          <MItem onClick={handleClose}>
            <NavLink to={routes.HOME}>Home</NavLink>
          </MItem>

          <MItem onClick={handleClose}>
            <NavLink to={routes.BOARD}>Board</NavLink>
          </MItem>
        </M>
      </div>

      <div>
        <Button
          aria-controls="simple-menu"
          aria-haspopup="true"
          onClick={handleClick}
        >
          MENU-2
        </Button>
        <M
          id="simple-menu"
          anchorEl={anchorEl}
          keepMounted
          open={Boolean(anchorEl)}
          onClose={handleClose}
        >
          <MItem onClick={handleClose}>
            <NavLink to={routes.HOME}>Home</NavLink>
          </MItem>

          <MItem onClick={handleClose}>
            <NavLink to={routes.COMMUTE}>Commute</NavLink>
          </MItem>

          <MItem onClick={handleClose}>
            <NavLink to={routes.BOARD}>Board</NavLink>
          </MItem>
        </M>
      </div>
    </>
  );
};

export default withStyles(styles)(Menu);
