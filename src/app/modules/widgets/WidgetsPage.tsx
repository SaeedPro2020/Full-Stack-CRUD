import React from 'react'
import {Redirect, Route, Switch} from 'react-router-dom'
import {PageLink, PageTitle} from '../../../demoresource/layout/core'
import {ListOfProducts} from '../../pages/crud/components/ListOfProducts'

const widgetsBreadCrumbs: Array<PageLink> = [
  {
    title: 'Widgets',
    path: '/crafted/widgets/charts',
    isSeparator: false,
    isActive: false,
  },
  {
    title: '',
    path: '',
    isSeparator: true,
    isActive: false,
  },
]

const WidgetsPage: React.FC = () => {
  return (
    <Switch>
      <Route path='/crafted/widgets/mixed'>
        <PageTitle breadcrumbs={widgetsBreadCrumbs}>Mixed</PageTitle>
        <ListOfProducts />
      </Route>
      <Redirect from='/crafted/widgets' exact={true} to='/crafted/widgets/lists' />
      <Redirect to='/crafted/widgets/lists' />
    </Switch>
  )
}

export default WidgetsPage
