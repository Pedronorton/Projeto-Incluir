import React, { useEffect, useState } from "react";
import classNames from "classnames";
import PropTypes from "prop-types";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import Snack from "@material-ui/core/Snackbar";
import IconButton from "@material-ui/core/IconButton";
// @material-ui/icons
import Close from "@material-ui/icons/Close";
import { useAlert } from "../../../src/context/Feedback/alertContext";

// core components
import styles from "assets/jss/material-dashboard-react/components/snackbarContentStyle.js";

const useStyles = makeStyles(styles);

export default function Snackbar(props) {
  const classes = useStyles();
  const { message, color, close, icon, place, rtlActive } = props;
  const { feedbackAlert, setAlert } = useAlert();
  const [open, setOpen] = useState(false);
  var action = [];
  const messageClasses = classNames({
    [classes.iconMessage]: icon !== undefined,
  });
  useEffect(() => {
    if (feedbackAlert.active) {
      setOpen(true);
      setTimeout(() => {
        setOpen(false);
        setAlert((prev) => ({
          ...prev,
          active: false,
        }));
      }, 2000);
    }
  }, [feedbackAlert.active]);
  if (close !== undefined) {
    action = [
      <IconButton
        className={classes.iconButton}
        key="close"
        aria-label="Close"
        color="inherit"
        onClick={() => props.closeNotification()}
      >
        <Close className={classes.close} />
      </IconButton>,
    ];
  }
  return (
    <Snack
      anchorOrigin={{
        vertical: place.indexOf("t") === -1 ? "bottom" : "top",
        horizontal:
          place.indexOf("l") !== -1
            ? "left"
            : place.indexOf("c") !== -1
            ? "center"
            : "right",
      }}
      open={open}
      message={
        <div>
          {icon !== undefined ? <props.icon className={classes.icon} /> : null}
          <span className={messageClasses}>{message}</span>
        </div>
      }
      action={action}
      ContentProps={{
        classes: {
          root: classes.root + " " + classes[color],
          message: classes.message,
          action: classNames({ [classes.actionRTL]: rtlActive }),
        },
      }}
    />
  );
}

Snackbar.propTypes = {
  message: PropTypes.node.isRequired,
  color: PropTypes.oneOf(["info", "success", "warning", "danger", "primary"]),
  close: PropTypes.bool,
  icon: PropTypes.object,
  place: PropTypes.oneOf(["tl", "tr", "tc", "br", "bl", "bc"]),
  open: PropTypes.bool,
  rtlActive: PropTypes.bool,
  closeNotification: PropTypes.func,
};
