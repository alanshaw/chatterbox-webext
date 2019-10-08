import { contextProvider, withContext } from 'react-provide'
import browser from 'webextension-polyfill'

export default async () => {
  const { cbox } = await browser.runtime.getBackgroundPage()
  return cbox
}

// Create a Provider that'll put an object called 'cbox' into context
export const Provider = contextProvider('cbox')

// Create a helper that pulls 'cbox' out of context and passes it as a prop
export const withChatterbox = withContext('cbox')
