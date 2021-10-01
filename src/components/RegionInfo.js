import {
  Collapse, IconButton,
  List,
  ListItem,
  TableCell,
  TableRow,
} from "@material-ui/core"
import KeyboardArrowUpIcon from "@material-ui/icons/KeyboardArrowUp"
import KeyboardArrowDownIcon from "@material-ui/icons/KeyboardArrowDown"
import Regions from "../data/regionsAggregate.json"
import React, {useState} from "react"
import {makeStyles} from "@material-ui/styles"
import {NavLink} from "react-router-dom"

const useStyles = makeStyles(() => ({
  root: {
    '& > *': {
      borderBottom: 'unset',
    },
  },
  link: {
    color: '#000',
    textDecoration: 'none',
    fontSize: '18px'
  }
}));

export const RegionInfo = ({id, libs}) => {
  const classes = useStyles();
  const [expanded, setExpanded] = useState(false);


  return (
    <>
      <TableRow className={classes.root}>
        <TableCell>
          <IconButton aria-label="expand row" size="small" onClick={() => setExpanded(!expanded)}>
            {expanded ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell component="th" scope="row">
          {Regions[id].name}
        </TableCell>
        <TableCell component="th" scope="row">
          {libs.length}
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={expanded} timeout="auto" unmountOnExit>
            <List>
              {libs.map(lib => <ListItem>
                <NavLink className={classes.link} to={`/${id}/${lib.nativeId}`}> {lib.data.general.name}</NavLink>
              </ListItem>)}
            </List>
          </Collapse>
        </TableCell>
      </TableRow>
    </>
  )
}
