import { describe, it } from '../../utils/mochaw'
import { localhostUrl } from '../../config.json'
import { takePercySnapshot } from './sharedFlows'

const options = {
  pageObjects: ['Welcome', 'DocumentSelector', 'BasePage'],
}

export const documentSelectorScenarios = async (lang) => {
  describe(
    `DOCUMENT SELECTOR scenarios in ${lang}`,
    options,
    ({ driver, pageObjects }) => {
      const { welcome, documentSelector, basePage } = pageObjects
      const copy = basePage.copy(lang)

      it('should verify UI elements on the document selection screen @percy', async () => {
        driver.get(`${localhostUrl}?language=${lang}`)
        welcome.continueToNextStep()
        documentSelector.verifyTitle(copy)
        await documentSelector.verifySubtitle(copy)
        await documentSelector.verifyLabels(copy)
        await documentSelector.verifyHints(copy)
        await documentSelector.verifyIcons()
        await takePercySnapshot(
          driver,
          `should verify UI elements on the document selection screen ${lang}`
        )
      })
    }
  )
}
