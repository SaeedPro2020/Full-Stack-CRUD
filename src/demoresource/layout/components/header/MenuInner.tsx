import React from 'react'
import {MenuItem} from './MenuItem'
import {MenuInnerWithSub} from './MenuInnerWithSub'
import {useIntl} from 'react-intl'

export function MenuInner() {
  const intl = useIntl()
  return (
    <>
      <MenuItem title={intl.formatMessage({id: 'MENU.DASHBOARD'})} to='/dashboard' />
      <MenuInnerWithSub
        title='Projects'
        to='/apps'
        menuPlacement='bottom-start'
        menuTrigger='click'
      >
        {/* PAGES */}

        <MenuItem to='/crafted/widgets/products' title='Ecommerce' hasBullet={true} />
        {/* <MenuItem to='/crafted/widgets/feeds' title='Teacher report' hasBullet={true} /> */}
      </MenuInnerWithSub>
    </>
  )
}
