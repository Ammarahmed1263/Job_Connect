import downloadResume from './downloadResume';
import shareResume from './shareResume';

const handleDownloadResume = async (resumeUrl: string, fileName: string) => {
  try {
    const uri = await downloadResume(resumeUrl, fileName);
    await shareResume(uri);
  } catch (error) {
    // Errors are already handled in the individual functions
    console.error("Resume handling error:", error);
  }
};

export default handleDownloadResume;