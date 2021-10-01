import React, { useMemo, useState} from 'react'
import Regions from "../data/regionsAggregate.json"

import {
  Container, InputBase, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TableSortLabel
} from "@material-ui/core"

import {RegionInfo} from "../components/RegionInfo";

import {useLibraries} from "../hooks/useLibraries";
import {makeStyles} from "@material-ui/styles";

import {getComparator} from "../utils";
import {SearchInput} from "../components/SearchInput";
import {LibrariesContext} from "../store/LibrariesContext";


function stableSort(array, comparator) {

  return array.sort(([currentId, currentLibs], [nextId, nextLibs]) => {
    const currentLibsCount = currentLibs.length
    const nextLibsCount = nextLibs.length

    const currentRegionName = Regions[currentId].name.toLowerCase()
    const nextRegionName = Regions[nextId].name.toLowerCase()


    switch (comparator) {
      case 'asc-region': {
        if (currentRegionName < nextRegionName)
          return -1
        if (currentRegionName > nextRegionName)
          return 1
        return 0
      }

      case 'desc-region': {
        if (currentRegionName < nextRegionName)
          return 1
        if (currentRegionName > nextRegionName)
          return -1
        return 0
      }

      case 'desc-number': {
        return nextLibsCount - currentLibsCount
      }
      case 'asc-number': {
        return currentLibsCount - nextLibsCount
      }
    }
  })
}

export const Order = () => {

  const [order, setOrder] = React.useState('asc')
  const [orderBy, setOrderBy] = React.useState()
  const [query, setQuery] = useState('')

  const { libraries } = useLibraries()

  const foundLibs = useMemo(() => {
    return stableSort(libraries.filter(([id]) => Regions[id].name.toLowerCase().indexOf(query.toLowerCase()) !== -1), getComparator(order, orderBy))
  }, [libraries, query, order, orderBy])


  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  }

  const createSortHandler = (property) => (event) => {
    handleRequestSort(event, property);
  }

  const handleSearch = (value) => {
    setQuery(value)
  }

  return (
    <LibrariesContext.Consumer>
      {([{loading}]) => !loading && (<Container>
        <SearchInput
          onChange={handleSearch}
        />
        <TableContainer component={Paper}>
          <Table aria-label="collapsible table">
            <TableHead>
              <TableRow>
                <TableCell />
                <TableCell
                  sortDirection={orderBy === 'region' ? order : false}
                >
                  <TableSortLabel
                    active={orderBy === 'region'}
                    direction={orderBy === 'region' ? order : 'asc'}
                    onClick={createSortHandler('region')}
                  >
                    Регион
                  </TableSortLabel>
                </TableCell>
                <TableCell
                  sortDirection={orderBy === 'number' ? order : false}
                >
                  <TableSortLabel
                    active={orderBy === 'number'}
                    direction={orderBy === 'number' ? order : 'asc'}
                    onClick={createSortHandler('number')}
                  >
                    Количество библиотек
                  </TableSortLabel>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {foundLibs.map(([id, libs]) => <RegionInfo id={id} libs={libs} key={id}/>)}
            </TableBody>
          </Table>
        </TableContainer>
      </Container>)}
    </LibrariesContext.Consumer>
  )
}
