import {
  AudioTrack,
  CarouselLayout,
  ControlBar,
  ParticipantTile,
  VideoTrack,
  useTracks,
} from '@livekit/components-react';
import { Track } from 'livekit-client';

export default function Stage() {
  const cameraTracks = useTracks([Track.Source.Camera]);

  const agentCam = cameraTracks.find(({ participant }) => participant.isAgent);
  const participantCams = cameraTracks.filter(({ participant }) => !participant.isAgent);

  const agentSound = useTracks([Track.Source.Microphone]).find(
    (tr) => tr.publication.trackName === 'agent-mic',
  );

  return (
    <div>
      <div
        id="background"
        style={{ position: 'absolute', width: '100%', height: '100%', overflow: 'hidden' }}
      >
        {agentCam && <VideoTrack trackRef={agentCam} style={{ objectFit: 'cover' }} />}
      </div>
      <div id="participants">
        <CarouselLayout tracks={participantCams}>
          <ParticipantTile />
        </CarouselLayout>
      </div>
      <div id="controls" style={{ position: 'absolute', bottom: '10px' }}>
        <ControlBar controls={{ chat: false, screenShare: false }} />
      </div>
      {agentSound && <AudioTrack trackRef={agentSound} />}
    </div>
  );
}
