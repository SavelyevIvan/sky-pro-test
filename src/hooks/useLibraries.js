import React, {useCallback, useContext, useEffect, useMemo, useState} from "react";
import {LibrariesContext} from "../store/LibrariesContext";
import {getLibs} from "../api";

export const useLibraries = () => {
  const [{libraries: _libraries}, setState] = useContext(LibrariesContext)
  const [info, setInfo] = useState()

  useEffect(() => {
      setState(prev => ({...prev, loading: true}))
      getLibs()
        .then(libs => setState(prev => ({...prev, libraries: libs, loading: false})))
  }, [])

  const libraries = useMemo(() => {

    const aggregatedByRegions = _libraries.reduce((result, lib) => {
        if (result[lib.data.general.organization.address.fiasRegionId]) {
          result[lib.data.general.organization.address.fiasRegionId].push(lib)
        } else {
          result[lib.data.general.organization.address.fiasRegionId] = [lib]
        }
        return result
    }, {})

    return Object.entries(aggregatedByRegions)
  }, [_libraries])

  const library = useMemo(() => {
    return new Map(libraries).get(info?.regionId)?.find(lib => lib.nativeId === info?.libId)?.data?.general
  }, [libraries, info])

  const getLibrary = useCallback((info) => {
    setInfo(info)
  }, [])

  return ({libraries, getLibrary, library})
}
