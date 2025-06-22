import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import React, { Dispatch, SetStateAction } from "react";

interface DeletePopupProps {
  showDialog: boolean;
  setShowDialog: Dispatch<SetStateAction<boolean>>;
  selectedStory?: {
    storyId: number;
    title: string;
  } | null;
  handleDeleteStory?: (id: number) => void;
}
const DeletePopup = ({
  showDialog,
  setShowDialog,
  selectedStory,
  handleDeleteStory,
}: DeletePopupProps) => {
  return (
    <Dialog open={showDialog} onOpenChange={setShowDialog}>
      <DialogContent className="bg-mystic-800 text-white border-0">
        <DialogHeader>
          <DialogTitle >Are you sure?</DialogTitle>
          <DialogDescription className="text-mystic-500">
            This will permanently delete your story:
            <span className="font-semibold text-red-400">
              {" "}
              "{selectedStory?.title}"
            </span>
            . This action cannot be undone.
          </DialogDescription>
        </DialogHeader>

        <div className="flex justify-end gap-2 mt-4">
          <button
            onClick={() => setShowDialog(false)}
            className="px-4 cursor-pointer py-2 rounded-md bg-gray-300 text-black hover:bg-gray-400"
          >
            Cancel
          </button>
          <button
            onClick={() => {
              if (handleDeleteStory && selectedStory?.storyId) {
                handleDeleteStory(selectedStory?.storyId);
                setShowDialog(false);
              }
            }}
            className="px-4 cursor-pointer py-2 rounded-md bg-rose-600 text-white hover:bg-rose-700"
          >
            Delete
          </button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default DeletePopup;
