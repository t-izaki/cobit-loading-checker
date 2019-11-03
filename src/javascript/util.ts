/* eslint-disable import/prefer-default-export */

export const sleep = (waitSeconds: number) => {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve()
    }, waitSeconds * 1000)
  })
}
