// import { Container, injectable, inject } from 'inversify';
// import 'reflect-metadata';
// import BaseLauncher from '../../packages/core/BaseLauncher';
//
// @injectable()
// class Katana {
//   public hit() {
//     return 'cut!';
//   }
// }
//
// @injectable()
// class Shuriken {
//   public throw() {
//     return 'hit!';
//   }
// }
//
// @injectable()
// class Ninja implements Ninja {
//   @inject(Katana) private _katana: Katana;
//   @inject(Shuriken) private _shuriken: Shuriken;
//
//   public fight() {
//     return this._katana.hit();
//   }
//   public sneak() {
//     return this._shuriken.throw();
//   }
// }
//
// class JapanIocProfiler {
//   public static profile(container: Container): void {
//     container.bind<Ninja>(Ninja).to(Ninja);
//     container.bind<Katana>(Katana).to(Katana);
//     container.bind<Shuriken>(Shuriken).to(Shuriken);
//   }
// }
//
// class Launcher extends BaseLauncher {
//   public profile(): void {
//     JapanIocProfiler.profile(this._container);
//   }
// }
//
// const application = new Launcher();
// console.log('CONTAINER', application._container.get<Ninja>(Ninja).fight());
