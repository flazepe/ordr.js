export class Client {
    constructor(apiKey?: string);
    apiKey?: string;
    baseApiUrl: string;
    webSocketUrl: string;

    on(event: "render_added", listener: (data: { renderID: number }) => any): this;
    on(event: "render_done", listener: (data: { renderID: number }) => any): this;
    on(event: "render_failed", listener: (data: { renderID: number; code: number; error: string }) => any): this;
    on(event: "render_error", listener: (data: { renderID: number }) => any): this;
    on(event: "render_progress", listener: (data: { renderID: number; status: string; progression: string | null }) => any): this;

    start(): void;
    newRender(body?: {
        BGParallax?: boolean;
        breakBGDim?: number;
        cursorRainbow?: boolean;
        cursorRipples?: boolean;
        cursorScaleToCS?: boolean;
        cursorSize?: number;
        cursorTrail?: boolean;
        cursorTrailGlow?: boolean;
        drawComboNumbers?: boolean;
        drawFollowPoints?: boolean;
        globalVolume?: number;
        hitsoundVolume?: number;
        inGameBGDim?: number;
        introBGDim?: number;
        loadStoryboard?: boolean;
        loadVideo?: boolean;
        musicVolume?: number;
        objectsFlashToTheBeat?: boolean;
        objectsRainbow?: boolean;
        replayFile: File;
        replayURL: string;
        resolution: string;
        scaleToTheBeat?: boolean;
        seizureWarning?: boolean;
        showBorders?: boolean;
        showComboCounter?: boolean;
        showDanserLogo?: boolean;
        showHPBar?: boolean;
        showHitCounter?: boolean;
        showHitErrorMeter?: boolean;
        showKeyOverlay?: boolean;
        showMods?: boolean;
        showPPCounter?: boolean;
        showResultScreen?: boolean;
        showScore?: boolean;
        showScoreboard?: boolean;
        showUnstableRate?: boolean;
        skin: string;
        skip?: boolean;
        sliderMerge?: boolean;
        sliderSnakingIn?: boolean;
        sliderSnakingOut?: boolean;
        useBeatmapColors?: boolean;
        useHitCircleColor?: boolean;
        useSkinColors?: boolean;
        useSkinCursor?: boolean;
        useSkinHitsounds?: boolean;
        username: string;
        devmode: "success" | "fail" | "wsfail";
    }): Promise<API.NewRender>;
    renders(params?: { pageSize?: number; page?: number; ordrUsername?: string; replayUsername?: string; renderID?: number }): Promise<API.Renders>;
    skins(params?: { pageSize?: number; page?: number; search?: string }): Promise<API.Skins>;
    servers(params?: { sort?: "online" | "totalvideos" }): Promise<API.Servers>;
}

declare namespace API {
    interface NewRender {
        message: string;
        errorCode: number;
        renderID?: number;
    }

    interface Renders {
        renders: API.Render[];
        maxRenders: number;
    }

    interface Render {
        date: string;
        readableDate: string;
        renderID: number;
        username: string;
        progress: string;
        errorCode: number;
        renderer: string;
        description: string;
        title: string;
        replayFilePath: string;
        videoUrl: string;
        mapLink: string;
        mapTitle: string;
        mapLength: number;
        replayDifficulty: string;
        replayUsername: string;
        replayMods: string;
        mapID: number;
        needToRedownload: boolean;
        resolution: string;
        globalVolume: number;
        musicVolume: number;
        hitsoundVolume: number;
        useSkinHitsounds: boolean;
        showHitErrorMeter: boolean;
        showUnstableRate: boolean;
        showScore: boolean;
        showHPBar: boolean;
        showComboCounter: boolean;
        showPPCounter: boolean;
        showKeyOverlay: boolean;
        showScoreboard: boolean;
        showBorders: boolean;
        showMods: boolean;
        showResultScreen: boolean;
        skin: string;
        hasCursorMiddle: boolean;
        useSkinCursor: boolean;
        useSkinColors: boolean;
        useBeatmapColors: boolean;
        cursorScaleToCS: boolean;
        cursorRainbow: boolean;
        cursorTrailGlow: boolean;
        cursorSize: number;
        cursorTrail: boolean;
        drawFollowPoints: boolean;
        drawComboNumbers: boolean;
        scaleToTheBeat: boolean;
        sliderMerge: boolean;
        objectsRainbow: boolean;
        objectsFlashToTheBeat: boolean;
        useHitCircleColor: boolean;
        seizureWarning: boolean;
        loadStoryboard: boolean;
        loadVideo: boolean;
        introBGDim: number;
        inGameBGDim: number;
        breakBGDim: number;
        BGParallax: boolean;
        showDanserLogo: boolean;
        motionBlur960fps: boolean;
        skip: boolean;
        cursorRipples: boolean;
        sliderSnakingIn: boolean;
        sliderSnakingOut: boolean;
        isVerified: boolean;
        isBot: boolean;
        renderStartTime: number;
        renderEndTime: number;
        renderTotalTime: number;
        uploadEndTime: number;
        uploadTotalTime: number;
        removed: boolean;
    }

    interface Skins {
        message: string;
        skins: API.Skin[];
        maxSkins: number;
    }

    interface Skin {
        skin: string;
        presentationName: string;
        url: string;
        lowResPreview: string;
        highResPreview: string;
        mozaicPreview: string;
        id: number;
        hasCursorMiddle: boolean;
        gridPreview: string;
    }

    interface Servers {
        servers: API.Server[];
    }

    interface Server {
        enabled: boolean;
        lastSeen: string;
        name: string;
        priority: number;
        power: string;
        status: string;
        totalRendered: number;
        renderingType: string;
        cpu: string;
        gpu: string;
        motionBlurCapable: boolean;
        usingOsuApi: boolean;
        avgRenderTime: number;
        avgUploadTime: number;
        totalAvgTime: number;
        avgFPS: number;
        totalUploadedVideosSize: number;
    }
}

export const wsStatuses: {
    Waiting: string;
    "Uploading...": string;
    "Finalizing...": string;
};

export const wsCodes: Record<1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 13 | 14 | 18 | 19 | 20 | 21 | 22, string>;
export const apiCodes: Record<2 | 5 | 6 | 7 | 15 | 16 | 17 | 24, string>;

export class BaseError extends Error {
    constructor();
    type: string;
    toJSON(): {
        type: string;
        message: string;
    };
}

export class FatalError extends BaseError {
    constructor(error: string | Error);
}

export class APIError extends BaseError {
    constructor(error: string | Error, response: any, status: string, method: string, url: string);
    status: string;
    method: string;
    url: string;
    result: string;
    code: number;
    error: string;
}

export class ParseError extends BaseError {
    constructor(message: string, response: any, status: string, method: string, url: string);
    status: string;
    method: string;
    url: string;
    response: any;
}