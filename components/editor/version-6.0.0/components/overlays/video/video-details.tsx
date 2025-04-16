/**
 * VideoDetails Component
 *
 * A component that provides a user interface for configuring video overlay settings and styles.
 * It displays a video preview along with two tabbed panels for adjusting settings and visual styles.
 *
 * Features:
 * - Video preview display
 * - Settings panel for basic video configuration
 * - Style panel for visual customization
 *
 * @component
 */

import React from "react";
import { ClipOverlay } from "../../../types";
import { PaintBucket, Settings } from "lucide-react";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "../../../../../ui/tabs";
import { VideoStylePanel } from "./video-style-panel";
import { VideoSettingsPanel } from "./video-settings-panel";

interface VideoDetailsProps {
  /** The current state of the video overlay */
  localOverlay: ClipOverlay;
  /** Callback function to update the video overlay state */
  setLocalOverlay: (overlay: ClipOverlay) => void;
}

/**
 * VideoDetails component for managing video overlay configuration
 *
 * @param {VideoDetailsProps} props - Component props
 * @param {ClipOverlay} props.localOverlay - Current video overlay state
 * @param {Function} props.setLocalOverlay - Function to update overlay state
 */
export const VideoDetails: React.FC<VideoDetailsProps> = ({
  localOverlay,
  setLocalOverlay,
}) => {
  /**
   * Updates the style properties of the video overlay
   *
   * @param {Partial<ClipOverlay["styles"]>} updates - Style properties to update
   */
  const handleStyleChange = (updates: Partial<ClipOverlay["styles"]>) => {
    const updatedOverlay = {
      ...localOverlay,
      styles: {
        ...localOverlay.styles,
        ...updates,
      },
    };
    setLocalOverlay(updatedOverlay);
  };

  return (
    <div className="space-y-4">
      {/* Preview */}
      <div className="relative aspect-[16/7] w-full overflow-hidden rounded-sm border border-gray-200 dark:border-gray-700 bg-gray-100/40 dark:bg-black/40">
        <img
          src={localOverlay.content}
          alt="Video preview"
          className="h-full w-full object-cover"
        />
      </div>

      {/* Settings Tabs */}
      <Tabs defaultValue="settings" className="w-full">
        <TabsList className="w-full grid grid-cols-2 bg-gray-100/50 dark:bg-gray-800/50 backdrop-blur-sm rounded-sm border border-gray-200 dark:border-gray-700 gap-1">
          <TabsTrigger
            value="settings"
            className="data-[state=active]:bg-blue-500/20 data-[state=active]:text-gray-900 dark:data-[state=active]:text-white 
            rounded-sm transition-all duration-200 text-gray-600 dark:text-zinc-400 hover:text-gray-900 dark:hover:text-zinc-200 hover:bg-gray-200/50 dark:hover:bg-gray-700/50"
          >
            <span className="flex items-center gap-2 text-xs">
              <Settings className="w-3 h-3" />
              Settings
            </span>
          </TabsTrigger>
          <TabsTrigger
            value="style"
            className="data-[state=active]:bg-blue-500/20 data-[state=active]:text-gray-900 dark:data-[state=active]:text-white 
            rounded-sm transition-all duration-200 text-gray-600 dark:text-zinc-400 hover:text-gray-900 dark:hover:text-zinc-200 hover:bg-gray-200/50 dark:hover:bg-gray-700/50"
          >
            <span className="flex items-center gap-2 text-xs">
              <PaintBucket className="w-3 h-3" />
              Style
            </span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="style" className="space-y-4 mt-4 h-auto">
          <VideoStylePanel
            localOverlay={localOverlay}
            handleStyleChange={handleStyleChange}
          />
        </TabsContent>

        <TabsContent value="settings" className="space-y-4 mt-4">
          <VideoSettingsPanel
            localOverlay={localOverlay}
            handleStyleChange={handleStyleChange}
          />
        </TabsContent>
      </Tabs>
    </div>
  );
};
