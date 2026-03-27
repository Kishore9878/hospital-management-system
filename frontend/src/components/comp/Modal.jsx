/* eslint-disable react/prop-types */
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
    DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";



const Modal = ({ selectedPatient, setSelectedPatient, title = false, name, children, close }) => {
    const modalTitle = title || 'Patient Details';
    const modalDescription = `Full details of the selected ${name || 'patient'}, including records and appointments.`;

    return (
        <Dialog open={!!selectedPatient} onOpenChange={() => setSelectedPatient(null)}>
            <DialogContent className="max-w-4xl bg-white">
                {/* Radix DialogContent expects Title/Description for accessibility.
                    When `title` is falsy, keep them visually hidden while preserving screen reader support. */}
                <DialogHeader className={title ? undefined : 'sr-only'}>
                    <DialogTitle>{modalTitle}</DialogTitle>
                    <DialogDescription>{modalDescription}</DialogDescription>
                </DialogHeader>

                {children}

                {close && <DialogFooter>
                    <Button variant="outline" onClick={() => setSelectedPatient(null)}>
                        Close
                    </Button>
                </DialogFooter>}
            </DialogContent>
        </Dialog>

    )
}

export default Modal