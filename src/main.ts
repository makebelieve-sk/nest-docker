import {NestFactory} from "@nestjs/core";
import {AppModule} from "./app.module";
import {DocumentBuilder, SwaggerModule} from "@nestjs/swagger";

async function start() {
    const PORT = process.env.PORT || 5000

    const app = await NestFactory.create(AppModule)

    const config = new DocumentBuilder()
        .setTitle("Backend")
        .setDescription("Документация по REST API")
        .setVersion("1.0.0")
        .addTag("Alexey")
        .build()
    const document = SwaggerModule.createDocument(app, config); // Создаем докумтенацию

    SwaggerModule.setup("/api/docs", app, document);

    await app.listen(PORT, () => console.log("Сервер запущен на порту: ", PORT))
}

start().then(null)