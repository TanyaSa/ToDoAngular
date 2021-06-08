import { trigger, animate, transition, style, query, animation, group, animateChild } from '@angular/animations';

export const fadeInAnimation =
    trigger('fadeInAnimation', [
        transition('* <=> *', [
            style({ position: 'relative' }),
            query(':enter, :leave', [
                style({
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%'
                })
            ],
                { optional: true }),
            query(':enter', [
                style({ opacity: 0, transform: 'translateY(-10px)' })
            ],
                { optional: true }
            ),
            //   query(':leave', animateChild(), { optional: true }),
            group([
                query(':leave', [
                    animate('300ms ease-out', style({ opacity: 0, transform: 'translateY(500px)' }))
                ],
                    { optional: true }),
                query(':enter', [
                    animate('300ms ease-out', style({ opacity: 1, transform: 'translateY(0)' }))
                ],
                    { optional: true })
            ]),
            //   query(':enter', animateChild(), { optional: true }),
        ]),
        // transition('* <=> FilterPage', [
        //   style({ position: 'relative' }),
        //   query(':enter, :leave', [
        //     style({
        //       position: 'absolute',
        //       top: 0,
        //       left: 0,
        //       width: '100%'
        //     })
        //   ]),
        //   query(':enter', [
        //     style({ left: '-100%' })
        //   ]),
        //   query(':leave', animateChild()),
        //   group([
        //     query(':leave', [
        //       animate('200ms ease-out', style({ left: '100%' }))
        //     ]),
        //     query(':enter', [
        //       animate('300ms ease-out', style({ left: '0%' }))
        //     ])
        //   ]),
        //   query(':enter', animateChild()),
        // ])
    ]);





// export const fadeInAnimation =
//     // trigger name for attaching this animation to an element using the [@triggerName] syntax
//     trigger('fadeInAnimation', [

//         // route 'enter' transition
//         // transition('*<=>*', [
//         //     // css styles at start of transition
//         //     style({ opacity: 0 }),
//         //     // animation and styles at end of transition
//         //     animate('.15s', style({ opacity: 1 }))
//         // ]),
//         // Set a default  style for enter and leave


//         transition(':enter', [
//             style({ opacity: 0 }),
//             animate('10000ms', style({ opacity: 1 })),
//         ]),
//         transition(':leave', [
//             animate('10000ms', style({ opacity: 0 }))
//         ])




        // transition(':enter', [
        //     style({
        //         position: 'absolute',
        //         // left: 0,
        //         width: '100%',
        //         opacity: 0,
        //         transform: 'translateY(-25px)',
        //     }),
        //     animate('6000ms ease', style({ opacity: 1, transform: 'translateY(0)' }))
        // ]),

        // transition(':leave', [
        //     style({
        //         position: 'absolute',
        //         // left: 0,
        //         width: '100%',
        //         opacity: 1,
        //         transform: 'translateY(0)',
        //     }),
        //     animate('6000ms ease', style({ opacity: 0, transform: 'translateY(800px)' }))
        // ])






        // transition('* <=> *', [
        //     query(':enter, :leave', [
        //         style({
        //             position: 'absolute',
        //             // left: 0,
        //             width: '100%',
        //             opacity: 0,
        //             transform: 'translateY(-25px)',
        //         }),
        //     ], { optional: true }),
        //     // Animate the new page in
        //     group([
        //         query(':enter', [
        //             animate('6000ms ease', style({ opacity: 1, transform: 'translateY(0)' })),
        //         ], { optional: true }),

        //         query(':leave', [
        //             animate('6000ms ease', style({ opacity: 0, transform: 'translateY(800px)' }))
        //         ], { optional: true })
        //     ])

        // ]),



        // transition(':enter', [
        //     style({ transform: 'translateX(100%)', opacity: 0 }),
        //     animate('600ms ease-in', style({ transform: 'translateX(0%)', 'opacity': 1 }))
        //   ]),

        //   transition(':leave', [
        //     style({ transform: 'translateX(0%)', opacity: 1 }),
        //     animate('0ms ease-in', style({ transform: 'translateX(100%)', 'opacity': 0 }))
        //   ])



        // query(':enter, :leave', style({ position: 'fixed', width: '100%' })),
        // group([
        //     query(':enter', [
        //         style({ transform: 'translateX(100%)' }),
        //         animate('0.5s ease-in-out', style({ transform: 'translateX(0%)' }))
        //     ]),
        //     query(':leave', [
        //         style({ transform: 'translateX(0%)' }),
        //         animate('0.5s ease-in-out', style({ transform: 'translateX(-100%)' }))]),
        // ])

    // ]);
