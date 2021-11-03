import webpack from "webpack";
import path from "path";
import merge from "webpack-merge";
import { plugins, rules } from "../../webpack/parts";
import pkg from "./package.json";

const webpackConfig: webpack.Configuration = merge<webpack.Configuration>(
    {
        mode: "development",
        entry: path.resolve(__dirname, "./src/index.tsx"),
        resolve: {
            extensions: [".js", ".jsx", ".ts", ".tsx"],
        },
        devServer: {
            port: 3003,
        },
    } as any,
    rules.babel,
    plugins.html,
    {
        plugins: [
            new webpack.container.ModuleFederationPlugin({
                name: "pageA",
                library: { type: "var", name: "pageA" },
                filename: "pageA.js",
                exposes: {
                    "./PageA": "./src/index.tsx",
                },
                shared: {
                    react: { singleton: true },
                    "react-dom": { singleton: true },
                },
            }),
        ],
    }
);

export default webpackConfig;
