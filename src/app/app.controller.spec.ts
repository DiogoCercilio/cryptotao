import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller';
import { AppService } from './app.service';

describe('AppController', () => {
  let appController: AppController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
      providers: [AppService],
    }).compile();

    appController = app.get<AppController>(AppController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(appController.getHello()).toBe('Hello World!');
    });
  });

  describe('root', () => {
    it('should visit CryptoTao App and test some stuff"', async () => {
      const data = await appController.checkCryptoTaoApp();

      expect(data.title).toEqual('CryptoTao');
      expect(data.subtitle).toEqual(
        'A better way tounlock your digital assets',
      );
      expect(data.callToActionBtn).toEqual('Join the waitlist');
      expect(data.banner).toEqual(
        'https://tailwindui.com/img/component-images/cloud-illustration-teal-cyan.svg',
      );
    });
  });
});
