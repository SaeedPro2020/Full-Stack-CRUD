import React, {Suspense, lazy} from 'react'
import {Redirect, Route, Switch} from 'react-router-dom'
import {FallbackView} from '../../demoresource/partials'
import {DashboardWrapper} from '../pages/dashboard/DashboardWrapper'
import {ListOfProducts} from '../pages/crud/components/ListOfProducts'
import {AddProducts} from '../pages/crud/components/AddProduct'

export function PrivateRoutes() {
  const ProfilePage = lazy(() => import('../pages/profile/ProfilePage'))

  return (
    <Suspense fallback={<FallbackView />}>
      <Switch>
        <Route path='/dashboard' component={DashboardWrapper} />
        <Route path='/crafted/widgets/products' component={ListOfProducts} />
        <Route path='/crafted/widgets/addProducts' component={AddProducts} />
        <Route path='/crafted/pages/profile' component={ProfilePage} />
        <Redirect from='/auth' to='/crafted/widgets/feeds' />
        <Redirect exact from='/' to='/crafted/widgets/feeds' />
        <Redirect to='error/404' />
      </Switch>
    </Suspense>
  )
}
