import Base from './BasePage.js'
import {locale, verifyElementCopy} from '../utils/mochaw'

class CrossDeviceEverythingWeNeed extends Base {

  get title() { return this.$('.onfido-sdk-ui-PageTitle-titleSpan')}
  get subtitle() { return this.$('.onfido-sdk-ui-PageTitle-subTitle')}
  get documentUploadedMessage() { return this.$('li:nth-child(1) > .onfido-sdk-ui-crossDevice-CrossDeviceSubmit-listText')}
  get videoUploadedMessage() { return this.$('li:nth-child(2) > .onfido-sdk-ui-crossDevice-CrossDeviceSubmit-listText')}
  get submitVerificationButton() { return this.$('.onfido-sdk-ui-Button-button-text')}

  copy(lang) { return locale(lang) }

  async verifyUIElements(copy) {
    const crossDeviceEverythingWeNeedtrings = copy.cross_device.submit
    verifyElementCopy(this.title, crossDeviceEverythingWeNeedtrings.title)
    verifyElementCopy(this.subtitle, crossDeviceEverythingWeNeedtrings.sub_title)
    verifyElementCopy(this.documentUploadedMessage, crossDeviceEverythingWeNeedtrings.one_doc_uploaded)
    verifyElementCopy(this.videoUploadedMessage, crossDeviceEverythingWeNeedtrings.video_uploaded)
    verifyElementCopy(this.submitVerificationButton, crossDeviceEverythingWeNeedtrings.action)
  }

  async clickOnSubmitVerificationButton() {
    this.submitVerificationButton.click()
  }
}

export default CrossDeviceEverythingWeNeed;
