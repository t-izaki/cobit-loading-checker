import { LOADING_CHECK_INTERVAL_SECOND } from './const'
import { sleep } from './util'

const checkIsLoading = (): boolean => {
  const loadingElement = document.querySelector('div[class^="circleLoader"]')

  return !!loadingElement
}

const isFinishLoading = (oldIsLoading: boolean, newIsLoading: boolean): boolean => {
  return oldIsLoading && newIsLoading === false
}

const notifyWhenFinishLoading = async (): Promise<void> => {
  let newIsLoading
  let isLoading = false

  // eslint-disable-next-line no-constant-condition
  while (true) {
    // eslint-disable-next-line no-await-in-loop
    await sleep(LOADING_CHECK_INTERVAL_SECOND)

    newIsLoading = checkIsLoading()
    if (isFinishLoading(isLoading, newIsLoading)) {
      // getURLの引数は、distフォルダでの相対パスを指定している
      const myAudio = new Audio(chrome.runtime.getURL('finish.mp3'))
      myAudio.play()
    }
    isLoading = newIsLoading
  }
}
;(async (): Promise<void> => {
  console.log('cobit loading checker is enabled')
  await notifyWhenFinishLoading()
})()
