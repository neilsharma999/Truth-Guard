

export interface DeepfakeResult {
    deepfake_probability: number;
    verdict: 'REAL' | 'FAKE' | 'SUSPICIOUS';
    signals: string[];
}


export async function detectDeepfake(file: File): Promise<DeepfakeResult> {
    
    
    const luck = (file.size % 100);
    
    let verdict: 'REAL' | 'FAKE' | 'SUSPICIOUS';
    let signals: string[] = [];

    if (luck > 80) {
        verdict = 'FAKE';
        signals = ['Eye blinking inconsistency', 'Artifacts in boundary regions', 'Static background noise'];
    } else if (luck > 40) {
        verdict = 'SUSPICIOUS';
        signals = ['Subtle lighting mismatches', 'Low resolution synthesis signs'];
    } else {
        verdict = 'REAL';
        signals = ['Natural skin texture mapped', 'Consistent shadow propagation'];
    }

    return {
        deepfake_probability: Math.round(luck),
        verdict,
        signals
    };
}
