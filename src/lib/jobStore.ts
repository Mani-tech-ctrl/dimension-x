type JobStatus = "processing" | "complete";

export type Job = {
    jobId: string;
    status: JobStatus;
    progress: number;
    modelUrl?: string;
};

const jobs: Record<string, Job> = {};

export function createJob(): Job {
    const jobId = crypto.randomUUID();

    const job: Job = {
        jobId,
        status: "processing",
        progress: 0,
    };

    jobs[jobId] = job;

    simulateProgress(jobId);

    return job;
}

export function getJob(jobId: string): Job | undefined {
    return jobs[jobId];
}

function simulateProgress(jobId: string) {
    const interval = setInterval(() => {
        const job = jobs[jobId];
        if (!job) return clearInterval(interval);

        if (job.progress >= 100) {
            job.status = "complete";
            job.modelUrl = "/dummy-model.glb"; // placeholder
            clearInterval(interval);
            return;
        }

        job.progress += 20;
    }, 1000);
}