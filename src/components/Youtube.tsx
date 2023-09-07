import { google, youtube_v3 } from 'googleapis'

const youtube = google.youtube('v3')

const apiKey = import.meta.env.VITE_REACT_APP_GOOGLE_KEY

async function is69(videoUrl: string) {
    try {
        const videoId = isYTVideo(videoUrl)

        if(!videoId) {
            throw new Error('Invalid Youtube video URL')
        }

        const videoDetails = await getVideoDetails([videoId])

        if(videoDetails){
            return videoDetails
        } else {
            throw new Error('Unable to retrieve video details')
        }
    } catch (error){
        console.error('error:', error)
        throw error
    } 
}

async function getVideoDetails(videoId: string[]) {
    try {
        const response = await youtube.videos.list({
            auth: apiKey,
            part: ['contentDetails'],
            id: videoId,
        });
    
        // Extract the video duration from the response
        if (!response || !response.data || !response.data.items || response.data.items.length === 0) {
            console.error('No video details found for video ID:', videoId);
            return null;
          }
      
        const contentDetails = response.data.items[0].contentDetails;

        return contentDetails
    
    //     if (contentDetails) {
    //       const duration = parseDuration(contentDetails.duration);
    //       return { duration };
    //     } else {
    //       return null;
    //     }
    //   } catch (error) {
    //     console.error('Error fetching video details:', error);
    //     throw error;
    //   }
    } catch(error){
        console.error('error:', error)
        throw error
    }
}

function isYTVideo(url: string): string | null {
    try {
        const urlObject = new URL(url)

        if(urlObject.hostname === 'www.youtube.com' || urlObject.hostname === 'youtube.com'){
            const searchParams = new URLSearchParams(urlObject.search)

            const videoId = searchParams.get('v')

            if(videoId && videoId.length === 11){
                return videoId
            }
        }
    } catch(error){

    }

    return null
}

function parseDuration(duration: string): number {
    let durationInMillis = 0

    if(duration.startsWith('PT') && duration.endsWith('S')){
        const timeString = duration.substring(2, duration.length - 1)

        const timeComponents = timeString.split('M')

        if(timeComponents.length === 2){
            const minutes = parseInt(timeComponents[0], 10)
            durationInMillis += minutes * 60 * 1000
        }
        const seconds = parseInt(timeComponents[timeComponents.length - 1], 10)
        durationInMillis += seconds * 1000
    }
    return durationInMillis
}

