import { getIsEnabled, setIsEnabled } from './util'

const handleChangeSelect = async (event: Event): Promise<void> => {
  const selectedValueString: string = (event.target as HTMLInputElement).value
  const selectedValue: boolean = selectedValueString === 'true'
  await setIsEnabled(selectedValue)
}
;(async (): Promise<void> => {
  const selectElement = document.getElementById('js-isEnabled') as HTMLSelectElement

  selectElement.value = (await getIsEnabled()) ? 'true' : 'false'

  selectElement.onchange = async (event: Event): Promise<void> => {
    await handleChangeSelect(event)
  }
})()
