export const swaggerOptions = {
    definition: {
        openapi: '3.0.1',
        info: {
            title: "AREA API Swagger",
            version: "0.1",
            description: "AREA",
        },
        basePath: '/',
        components: {
            securitySchemes: {
                bearerAuth: {
                    type: 'http',
                    scheme: 'bearer',
                    bearerFormat: 'JWT',
                    name: "access_token"
                }
            }
        },
        servers: [
            {
                url: "https://nikho.dev/",
            }
        ],
    },
    apis: [
        // AUTH
        "./src/routes/auth/LoginRoute.ts",
        "./src/routes/auth/RegisterRoute.ts",
        "./src/routes/auth/oauth/GithubLoginRoute.ts",
        "./src/routes/auth/oauth/GoogleLoginRoute.ts",

        // SERVICES
        "./src/routes/services/DiscordServiceRoute.ts",
        "./src/routes/services/GithubServiceRoute.ts",
        "./src/routes/services/SlackServiceRoute.ts",
        "./src/routes/services/TwitterServiceRoute.ts",

        // APPLETS
        "./src/routes/applets/AppletRoute.ts",
    ],
}
