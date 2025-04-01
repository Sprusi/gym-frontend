export interface BuildPaths {
  entry: string;
  output: string;
  html: string;
  favicon: string;
  src: string;
  public: string;
}

export type BuildMode = 'development' | 'production';

export interface BuildOptions {
  port: number;
  paths: BuildPaths;
  mode: BuildMode;
  hot?: boolean;
  analyzer?: boolean;
}
