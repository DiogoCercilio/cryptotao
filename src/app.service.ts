import { HttpCode, Injectable } from '@nestjs/common';
const got = require('got');
const cheerio = require('cheerio');

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!';
  }

  @HttpCode(200)
  async checkCryptoTaoApp() {
    return got('https://www.cryptotao.com').then(response => {
      const $ = cheerio.load(response.body);

      return {
        title: $('h1').eq(0).text(),
        subtitle: $('h1').eq(1).text(),
        callToActionBtn: $('button').text(),
        banner: $('img').attr('src')
      }
    }).catch(err => {
      return {
        msg: 'Error scrapping the page'
      }
    });
  }
}
