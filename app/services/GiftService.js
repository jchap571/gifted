
import { api } from "./AxiosService.js"
import { AppState } from "../AppState.js"
import { Gift } from "../models/Gift.js"
class GiftService {
  async findGift(giftId) {
    const openedGift = AppState.gifts.findIndex(Gift => Gift.id == giftId)
    console.log(openedGift)
    const giftData = { opened: !giftId.opened }
    const response = await api.put(`api/gifts/${giftId}`, giftData)
    const newGift = new Gift(response.data)
    const gifts = AppState.gifts
    gifts.splice(openedGift, 1, newGift)
  }


    



  async getGifts() {
    const response = await api.get('api/gifts')
    
    const gifts = response.data.map(giftsData => new Gift(giftsData))
    AppState.gifts = gifts

  }

  async createGift(giftData){
    const response = await api.post('api/gifts', giftData)
    console.log('created gift!', response.data)

    const newGift = new Gift(response.data)
    AppState.gifts.push(newGift)

    
  }

}


export const giftService = new GiftService()