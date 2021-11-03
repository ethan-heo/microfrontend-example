import webpack from "webpack";
import path from "path";
import merge from "webpack-merge";
import { plugins, rules } from "./parts";
import pkg from "../package.json";

const webpackConfig: webpack.Configuration = merge<webpack.Configuration>(
    {
        mode: "development",
        entry: path.resolve(__dirname, "../src/index.tsx"),
        resolve: {
            extensions: [".js", ".jsx", ".ts", ".tsx"],
        },
    },
    {
        devServer: {
            // contentBase: path.resolve(__dirname, "../dist"),
            port: 3002,
        },
    } as any,
    rules.babel,
    plugins.html,
    {
        plugins: [
            new webpack.container.ModuleFederationPlugin({
                name: "webapp",
                remotes: {}, // webapp에 추가할 remote 패키지
                shared: [
                    {
                        ...pkg.dependencies,
                        react: {
                            singleton: true,
                            eager: true,
                            requiredVersion: pkg.dependencies.react,
                        },
                        "react-dom": {
                            singleton: true,
                            eager: true,
                            requiredVersion: pkg.dependencies["react-dom"],
                        },
                    },
                ],
            }),
        ],
    }
);

export default webpackConfig;
