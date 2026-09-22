# Image credits and licensing

All photographs here come from [Unsplash](https://unsplash.com) under the
[Unsplash License](https://unsplash.com/license), which permits free use
including commercial use, without permission and without attribution. The two
things the licence forbids are selling the images unmodified, and compiling
them into a competing image service. Neither applies to this site.

Attribution is not required, but it is listed below so the source of each file
is traceable, and so nobody has to guess whether an image is safe to keep.

| File            | Source photo                                                                                      | Photographer      |
| --------------- | ------------------------------------------------------------------------------------------------- | ----------------- |
| `ridges.jpg`    | [A view of a mountain range in the fog](https://unsplash.com/photos/a-view-of-a-mountain-range-in-the-fog-rQVOlHFFLzs) | via Unsplash      |
| `ink-wash.jpg`  | [Misty mountain landscape with trees and fog](https://unsplash.com/photos/misty-mountain-landscape-with-trees-and-fog-2vseuo54GvA) | via Unsplash      |

## Why they are stored here rather than hot-linked

The privacy page states that reading a page sends no request to an outside
provider. Loading images from a third-party CDN would make that untrue, so the
files are committed to the repository and served from this site's own origin
through `next/image`.

## Processing applied

Each file was resized to 2000px wide and re-encoded as an optimised progressive
JPEG. `next/image` then serves per-device sizes in modern formats, and generates
the blur placeholder from the static import.

A third photograph, a smoke texture, was trialled behind the dark call-to-action
panel and then dropped. That panel has to stay dark for the ivory text to keep
its contrast, which buried the image completely, so it was costing bytes for no
visible benefit. A CSS gradient (`.ink-glow`) gives the same depth for free.

## If you replace one

Keep the same three constraints: self-hosted, a licence that allows commercial
use, and no photograph that implies something untrue about the company. In
particular, **no photographs of people presented as staff, no offices presented
as premises, and no screenshots presented as products.** Abstract and
atmospheric imagery carries none of those risks, which is why it was chosen.
