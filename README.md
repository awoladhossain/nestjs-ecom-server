### দরকারি সব packages install

```bash
pnpm add @nestjs/mongoose mongoose @nestjs/jwt @nestjs/passport passport passport-jwt bcryptjs @nestjs/config class-validator class-transformer stripe cloudinary nodemailer cookie-parser
```

```bash
pnpm add -D @types/passport-jwt @types/bcryptjs @types/nodemailer @types/cookie-parser
```


## Nestjs useFactory Concept
NestJS-এর useFactory একটি সাধারণ ফাংশনের মতো কাজ করে। আপনি প্যারামিটারে (config: ConfigService) লিখলেই NestJS নিজে থেকে বুঝে নেয় না যে এখানে আপনার ConfigService দরকার।

যখন আপনি inject: [ConfigService] লিখে দেন, তখন NestJS তার ইনভেন্টরি (IoC Container) থেকে ConfigService-এর একটি ইন্সট্যান্স খুঁজে এনে আপনার ফাংশনের ভেতর পাস করে। এটি না করলে config আর্গুমেন্টটি খালি বা undefined থাকে।


## main.ts

```bash
 app.setGlobalPrefix('api/v1');
  app.useGlobalPipes(new ValidationPipe({ whitelist: true }));
  app.use(cookieParser());
  await app.listen(process.env.PORT ?? 3000);
  console.log(`Server running on port ${process.env.PORT ?? 3000}`);
  ```

  - whitelist: true এর কাজ হলো: ধরুন আপনার DTO-তে শুধু email এবং password আছে। কোনো হ্যাকার যদি রিকোয়েস্ট বডিতে এক্সট্রা কোনো ডাটা (যেমন: role: 'admin') পাঠায়, তবে NestJS অটোমেটিক ওই এক্সট্রা ডাটাটি রিমুভ করে দিবে। এটি Mass Assignment Vulnerability রোধ করে।

  - JWT টোকেন ব্রাউজারের LocalStorage-এ রাখা নিরাপদ নয় (XSS Attack এর ভয় থাকে)। টোকেনটি HttpOnly Cookie-তে রাখলে এটি অনেক বেশি সিকিউর হয়। আপনি যেহেতু cookie-parser ব্যবহার করছেন, তার মানে আমরা সামনে টোকেনগুলো কুকিতে সেট করা শিখবো।
