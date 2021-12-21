import BasePage from './BasePage.js'
import { verifyElementCopy } from '../utils/mochaw'

class CrossDeviceSubmit extends BasePage {
  async documentUploadedMessage() {
    return this.$(
      'li:nth-child(1) > .onfido-sdk-ui-crossDevice-CrossDeviceSubmit-listText'
    )
  }
  async selfieUploadedMessage() {
    return this.$(
      'li:nth-child(2) > .onfido-sdk-ui-crossDevice-CrossDeviceSubmit-listText'
    )
  }
  async submitVerificationButton() {
    return this.$('[data-onfido-qa="cross-device-submit-btn"]')
  }

  async verifyUIElements(copy) {
    await verifyElementCopy(this.title(), copy.cross_device_checklist.title)
    await verifyElementCopy(
      this.subtitle(),
      copy.cross_device_checklist.subtitle
    )
    await verifyElementCopy(
      this.documentUploadedMessage(),
      copy.cross_device_checklist.list_item_doc_one
    )
    await verifyElementCopy(
      this.selfieUploadedMessage(),
      copy.cross_device_checklist.list_item_selfie
    )
    await verifyElementCopy(
      this.submitVerificationButton(),
      copy.cross_device_checklist.button_primary
    )
  }

  async clickOnSubmitVerificationButton() {
    this.submitVerificationButton().click()
  }
}

export default CrossDeviceSubmit
