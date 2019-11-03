/* eslint-disable import/prefer-default-export */

export const sleep = (waitSeconds: number): Promise<void> => {
  return new Promise((resolve: any): void => {
    setTimeout((): void => {
      resolve()
    }, waitSeconds * 1000)
  })
}

export const getIsEnabled = (): Promise<boolean> => {
  return new Promise<boolean>((resolve: any): void => {
    chrome.storage.sync.get((result: { [key: string]: boolean }): void => {
      resolve(result.isEnabled)
    })
  })
}

export const setIsEnabled = (isEnabled: boolean): Promise<void> => {
  return new Promise<any>((resolve: any): void => {
    chrome.storage.sync.set({ isEnabled }, (): void => {
      resolve()
    })
  })
}
