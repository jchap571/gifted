import { AppState } from "../AppState.js"
import { giftService } from "../services/GiftService.js"
import { getFormData } from "../utils/FormHandler.js"
import { Pop } from "../utils/Pop.js"
import { setHTML } from "../utils/Writer.js"


export class GiftController {
  constructor() {
    console.log('gift controller is loaded!')
    AppState.on('user', this.getGifts)
    AppState.on('gifts', this.drawGifts)
   
  }

  async getGifts() {
    try {
      await giftService.getGifts()
    } catch (error) {
      Pop.error(error)
      console.error(error)
    }
  }

  drawGifts() {
    const gifts = AppState.gifts
    let giftsHTML = ''
    gifts.forEach(gift => giftsHTML += gift.giftsHTMLTemplate)
    setHTML('gifts-options', giftsHTML)
    
  }

  async findGift(giftId) {
    try {
      await giftService.findGift(giftId)
    } catch (error) {
      Pop.error(error)
      console.error(error)
    }

  }

  async  createGift(){
    try {
      event.preventDefault()
      const giftFormElem = event.target
      const giftFormData = getFormData(giftFormElem)
      await giftService.createGift(giftFormData)
      Pop.toast('you created a gift!')
      // @ts-ignore
      giftFormElem.reset()
      this.drawGifts()

    } catch (error) {
      Pop.error(error)
      console.error(error)
    }
    

  }
      

}