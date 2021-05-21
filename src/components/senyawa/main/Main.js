import React from 'react'
import { Route, Switch, useRouteMatch } from 'react-router'
import {Content}  from '../../index'

const Main = () => {
  const {path} = useRouteMatch()
  return (
    <div  className="pr-5">
      <Switch>
        <Route path={`${path}/:isi`}>
          <Content />
        </Route>
      </Switch>
    </div>
  )
}

export default Main