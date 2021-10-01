import SearchIcon from "@material-ui/icons/Search";
import {InputBase, Paper} from "@material-ui/core";
import React, {useState} from "react";
import {makeStyles} from "@material-ui/styles";
import _ from "lodash";

const useStyles = makeStyles(() => ({
  root: {
    padding: '10px 25px',
    display: 'flex',
    alignItems: 'center',
    width: '500px',
    margin: '20px auto',
  },
  rootNotFocus: {
    backgroundColor: '#F1F3F4',
  },
  rootFocus: {
    boxShadow: '0 1px 1px rgba(0,0,0,0.24)',
    backgroundColor: '#fff',
    transition: 'background-color 75ms',
  },
  input: {
    marginLeft: '20px',
    flex: 1,
  },
}))

export const SearchInput = ({onChange}) => {
  const [isFocus, focus] = useState(false)
  const classes = useStyles()

  const handleInput = _.debounce((text) => {
    onChange(text);
  }, 300)

  const handlerFocus = () => {
    focus(true);
  }

  const handlerBlur = () => {
    focus(false);
  }
  return(<Paper
    component="div"
    className={
      isFocus
        ? `${classes.root} ${classes.rootFocus}`
        : `${classes.root} ${classes.rootNotFocus}`
    }
    elevation={0}
    onFocus={handlerFocus}
    onBlur={handlerBlur}
  >
    <SearchIcon />
    <InputBase
      onChange={(e) => handleInput(e.target.value)}
      className={classes.input}
      placeholder="Введите имя региона"
      autoFocus
      inputProps={{ 'aria-label': 'Search your documents by tag' }}
    />
  </Paper>)
}
