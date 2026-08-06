import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";

interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function HeaderSearchModal({ open, onOpenChange }: Props) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-xl">
        <DialogHeader className="mb-2">
          <DialogTitle>
            <Input
              type="text"
              placeholder="Search articles, authors, topics..."
            />
          </DialogTitle>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}
